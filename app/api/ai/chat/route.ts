import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/services/ai-service";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: string;
      history?: { role: string; content: string }[];
    };

    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    // Call the AIService to get the intelligent response
    const aiResponse = aiService.getResponse(message, history || []);

    // Clean Markdown stars from response
    const cleanResponse = aiResponse.response ? aiResponse.response.replace(/\*\*/g, "") : "";

    return NextResponse.json({
      response: cleanResponse,
      suggestions: aiResponse.suggestions || [],
      relatedProducts: [], // Disable automatic product cards
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
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}