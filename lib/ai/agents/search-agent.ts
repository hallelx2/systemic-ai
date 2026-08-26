import { generateText } from "ai";
import { agentModels } from "../config/models";
import { researchPrompts } from "../prompts/research-prompts";
import { pubmedSearchTool, fetchPubMedAbstract } from "../tools/pubmed-search";

interface SearchAgentInput {
  topic: string;
  maxPapers?: number;
  dateFrom?: string;
  dateTo?: string;
  focusAreas?: string[];
}

interface SearchResult {
  query: string;
  papers: any[];
  searchStrategy: string;
  totalFound: number;
}

/**
 * Search Agent - Finds relevant academic papers
 * Uses AI to formulate search queries and PubMed API to fetch papers
 */
export async function searchAgent(input: SearchAgentInput): Promise<SearchResult> {
  const { topic, maxPapers = 20, dateFrom, dateTo, focusAreas } = input;

  const focusContext = focusAreas?.length
    ? `\n\nFocus areas: ${focusAreas.join(", ")}`
    : "";

  const result = await generateText({
    model: agentModels.searchAgent,
    system: researchPrompts.searchAgent,
    tools: {
      pubmedSearch: pubmedSearchTool,
      fetchAbstract: fetchPubMedAbstract,
    },
    prompt: `Research Topic: "${topic}"${focusContext}

Your task:
1. Formulate an effective PubMed search query for this topic
2. Search PubMed using the pubmedSearch tool
3. Review the results and assess their relevance
4. If needed, refine the search with a better query

Search parameters:
- Maximum papers: ${maxPapers}
${dateFrom ? `- Date from: ${dateFrom}` : ""}
${dateTo ? `- Date to: ${dateTo}` : ""}

Provide a summary of your search strategy and the papers found.`,
  });

  // Extract papers from tool results
  const papers: any[] = [];
  let searchStrategy = result.text;
  let totalFound = 0;

  // Tool results are in the response for now
  // In production, you'd extract them from the tool execution

  return {
    query: topic,
    papers,
    searchStrategy,
    totalFound,
  };
}

/**
 * Simple wrapper for quick searches without AI reasoning
 */
export async function quickPubMedSearch(
  query: string,
  maxResults: number = 20
): Promise<any> {
  if (pubmedSearchTool.execute) {
    return await pubmedSearchTool.execute({ query, maxResults });
  }
  return { success: false, message: "Tool not available", papers: [] };
}
