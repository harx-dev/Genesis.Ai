// pages/api/generate.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  // Parse the request body
  const { question } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "API key is missing" },
      { status: 500 }
    );
  }

  if (!question) {
    return NextResponse.json(
      { message: "Question is required" },
      { status: 400 }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(question);

    // Check for a valid response
    if (result?.response?.text) {
      return NextResponse.json(
        { response: result.response.text() },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to get a valid response from the AI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { message: "Error generating content" },
      { status: 500 }
    );
  }
}
