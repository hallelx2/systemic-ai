import { streamText } from "ai";
import { google } from "@ai-sdk/google";

/**
 * Streaming Research Generation API
 * Generates research summaries using Gemini with real-time streaming
 */
export async function POST(request: Request) {
  try {
    const { topic, focusAreas } = await request.json();

    if (!topic) {
      return new Response(
        JSON.stringify({ error: "Topic is required" }),
        { status: 400 }
      );
    }

    const focusContext = focusAreas?.length
      ? `\n\nFocus specifically on: ${focusAreas.join(", ")}`
      : "";

    // Stream research summary using Gemini
    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      temperature: 0.3,
      system: `You are an expert research assistant specializing in academic literature.
Your task is to help researchers by identifying relevant papers and providing comprehensive summaries.
Always be specific, accurate, and cite realistic paper details.
Format your response in clear sections with markdown.`,
      prompt: `Research Topic: "${topic}"${focusContext}

Please provide a comprehensive research summary including:

## 1. Overview
Brief 2-3 sentence overview explaining why this topic is important and the current state of research.

## 2. Key Research Papers
List 5 important papers (realistic academic references from 2020-2024):

For each paper:
- **Title**: Full academic paper title
- **Authors**: Last name, First initial format (e.g., Smith, J. & Doe, A.)
- **Year**: 2020-2024
- **Journal/Conference**: Realistic publication venue
- **Key Finding**: 1-2 sentences describing the main contribution
- **Relevance**: Why this paper matters for the topic

## 3. Major Research Themes
Identify 3-4 main research directions or approaches being explored.

## 4. Research Gaps
What questions remain unanswered? What needs more investigation?

## 5. Future Directions
Where is the field heading? What are the next logical steps?

Make this comprehensive but concise. Use realistic academic references.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Streaming research generation error:", error);
    
    return new Response(
      JSON.stringify({
        error: "Failed to generate research summary",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
