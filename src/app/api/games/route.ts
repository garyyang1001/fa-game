import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { createGameFromVoice } from "@/lib/gemini";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { voiceInput, ageGroup, template, gameConfig } = body;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let gameData;
    if (voiceInput) {
      // Create game from voice input
      gameData = await createGameFromVoice({
        voiceInput,
        ageGroup,
        language: "zh-TW",
      });
    } else if (template && gameConfig) {
      // Create game from template
      gameData = {
        title: gameConfig.title,
        description: gameConfig.description,
        template,
        ageGroup,
        educationalGoals: gameConfig.educationalGoals || [],
        gameConfig,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Save game to database
    const game = await prisma.game.create({
      data: {
        ...gameData,
        creatorId: user.id,
        tags: gameData.educationalGoals || [],
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where = category ? { template: category } : { isPublic: true };

    const games = await prisma.game.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        creator: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            sessions: true,
          },
        },
      },
    });

    const formattedGames = games.map((game) => ({
      ...game,
      likes: game._count.likes,
      plays: game._count.sessions,
      creatorName: game.creator.name,
    }));

    return NextResponse.json(formattedGames);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}