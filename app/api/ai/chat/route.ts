// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/services/ai-service";
import type { AIChatMessage } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: string;
      history?: { role: string; content: string }[];
    };

    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const chatHistory: AIChatMessage[] = history
      .filter((h) => h && h.content)
      .map((h, i) => ({
        id: `msg-${i}`,
        role: h.role as "user" | "assistant" | "system",
        content: h.content,
        timestamp: new Date().toISOString(),
      }));

    const result = (await aiService.getResponse(message, chatHistory)) as { response: string; suggestions: string[]; relatedProducts: string[] };

    return NextResponse.json({
      response: result.response,
      suggestions: result.suggestions,
      relatedProducts: result.relatedProducts,
    });
  } catch (error) {
    console.error("AI chat API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        response: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
        suggestions: [],
        relatedProducts: [],
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}