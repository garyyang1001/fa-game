import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const game = await prisma.game.findUnique({
      where: { id: params.id },
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

    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }

    const formattedGame = {
      ...game,
      likes: game._count.likes,
      plays: game._count.sessions,
      creatorName: game.creator.name,
    };

    return NextResponse.json(formattedGame);
  } catch (error) {
    console.error("Error fetching game:", error);
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: 實作 Firebase Auth 驗證
    // 暫時跳過認證檢查
    
    const body = await request.json();
    
    // 暫時允許所有更新請求
    // TODO: 檢查用戶是否擁有此遊戲
    const updatedGame = await prisma.game.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: 實作 Firebase Auth 驗證
    // 暫時跳過認證檢查
    
    // 暫時允許所有刪除請求
    // TODO: 檢查用戶是否擁有此遊戲
    await prisma.game.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}