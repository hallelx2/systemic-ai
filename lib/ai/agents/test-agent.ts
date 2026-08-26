import { generateText } from "ai";
import { models } from "../config/models";

interface ResearchSummary {
  topic: string;
  papers: Array<{
    title: string;
    authors: string;
    year: string;
    keyFinding: string;
  }>;
  summary: string;
}

export async function simpleResearchAgent(topic: string): Promise<string> {
  const { text } = await generateText({
    model: models.gpt4Turbo,
    temperature: 0.3,
    prompt: `You are a research assistant helping to find academic papers.

Task: Find and summarize 5 key research papers about: "${topic}"

For each paper, provide:
1. Title (realistic academic paper title)
2. Authors (e.g., "Smith, J. & Doe, A.")
3. Year (between 2020-2024)
4. Key finding (1-2 sentences)

Format your response as a structured list. Be specific and realistic.`,
  });

  return text;
}

export async function advancedResearchAgent(
  topic: string,
  focusAreas?: string[]
): Promise<ResearchSummary> {
  const focusContext = focusAreas?.length
    ? `\nFocus specifically on these aspects: ${focusAreas.join(", ")}`
    : "";

  const { text } = await generateText({
    model: models.gpt4Turbo,
    temperature: 0.3,
    system: `You are an expert research assistant with deep knowledge of academic literature. 
You help researchers by identifying the most relevant and impactful papers in their field.`,
    prompt: `Research Topic: "${topic}"${focusContext}

Please provide:

1. A brief overview of the research landscape (2-3 sentences)

2. Five key papers with the following details:
   - Full title
   - Authors (last name, first initial format)
   - Publication year
   - One key finding or contribution

3. A synthesis paragraph explaining how these papers relate to each other and the current state of research

Format your response clearly with numbered sections.`,
  });

  // For now, return the raw text. In production, we'd parse this into structured data
  return {
    topic,
    papers: [], // Would parse from text
    summary: text,
  };
}

export async function streamingResearchAgent(topic: string) {
  const { generateText } = await import("ai");
  
  const result = await generateText({
    model: models.claude3Sonnet,
    temperature: 0.4,
    prompt: `Conduct a mini literature review on: "${topic}"

Structure:
1. Introduction (2-3 sentences on why this topic matters)
2. Key Research Areas (identify 3-4 main themes)
3. Representative Papers (2-3 papers per theme)
4. Current Gaps (what's missing in the research)
5. Future Directions (where the field is heading)

Make this comprehensive but concise. Include realistic paper references.`,
  });

  return result.text;
}
