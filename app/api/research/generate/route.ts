import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { NextRequest, NextResponse } from "next/server";

/**
 * Research Generation API
 * Generates research summaries using Claude AI
 */
export async function POST(request: NextRequest) {
  try {
    const { topic, focusAreas } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const focusContext = focusAreas?.length
      ? `\n\nFocus specifically on: ${focusAreas.join(", ")}`
      : "";

    // Generate research summary using Claude
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      temperature: 0.3,
      system: `You are an expert research assistant specializing in academic literature.
Your task is to help researchers by identifying relevant papers and providing comprehensive summaries.
Always be specific, accurate, and cite realistic paper details.`,
      prompt: `Research Topic: "${topic}"${focusContext}

Please provide a comprehensive research summary including:

1. **Overview** (2-3 sentences)
   - Why this topic is important
   - Current state of research

2. **Key Research Papers** (5 papers)
   For each paper:
   - Full title
   - Authors (last name, first initial)
   - Publication year (2020-2024)
   - Journal/Conference
   - Key finding (1-2 sentences)
   - Relevance to the topic

3. **Major Themes** (3-4 themes)
   - What are the main research directions?
   - What approaches are being used?

4. **Research Gaps**
   - What questions remain unanswered?
   - What needs more investigation?

5. **Future Directions**
   - Where is the field heading?
   - What are the next steps?

Make this comprehensive but concise. Use realistic academic references.`,
    });

    return NextResponse.json({
      success: true,
      topic,
      summary: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Research generation error:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate research summary",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
