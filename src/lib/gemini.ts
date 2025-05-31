import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface GameCreationPrompt {
  voiceInput: string;
  ageGroup: string;
  language?: string;
}

export interface GameData {
  title: string;
  description: string;
  template: string;
  ageGroup: string;
  educationalGoals: string[];
  gameConfig: any;
}

export async function createGameFromVoice(
  prompt: GameCreationPrompt
): Promise<GameData> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const systemPrompt = `
    You are an AI assistant that helps parents create educational games for children.
    Based on the voice input, create a game configuration.
    
    Voice Input: "${prompt.voiceInput}"
    Age Group: ${prompt.ageGroup}
    Language: ${prompt.language || "zh-TW"}
    
    Respond with a JSON object containing:
    - title: Game title
    - description: Brief description
    - template: One of ["matching", "sorting", "story", "puzzle"]
    - ageGroup: Age range
    - educationalGoals: Array of learning objectives
    - gameConfig: Specific configuration for the chosen template
    
    For matching games, gameConfig should include:
    - pairs: Array of {id, content, match} objects
    - theme: Visual theme
    
    Make it educational, fun, and age-appropriate.
  `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("Failed to parse game data");
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

export async function generateGameAssets(gameData: GameData) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
    Generate creative content for this educational game:
    Title: ${gameData.title}
    Template: ${gameData.template}
    Age Group: ${gameData.ageGroup}
    
    Provide additional content like:
    - Character names and descriptions
    - Story elements
    - Fun facts
    - Encouraging messages
    
    Make it engaging and educational for children.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating assets:", error);
    throw error;
  }
}