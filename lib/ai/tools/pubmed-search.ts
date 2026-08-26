import { tool } from "ai";
import { z } from "zod";

interface PubMedPaper {
  id: string;
  title: string;
  authors: string[];
  abstract?: string;
  publicationDate: string;
  journal?: string;
  doi?: string;
}

/**
 * Search PubMed database for research papers
 * Uses NCBI E-utilities API
 */
export const pubmedSearchTool = tool({
  description: `Search PubMed database for biomedical and life sciences research papers. 
  Returns paper IDs, titles, authors, and abstracts. Best for medical, biological, and health sciences research.`,
  
  parameters: z.object({
    query: z.string().describe("Search query using PubMed syntax"),
    maxResults: z.number().default(20).describe("Maximum number of results to return (default: 20)"),
    dateFrom: z.string().optional().describe("Start date in YYYY/MM/DD format"),
    dateTo: z.string().optional().describe("End date in YYYY/MM/DD format"),
  }),
  
  execute: async ({ query, maxResults, dateFrom, dateTo }: { query: string; maxResults: number; dateFrom?: string; dateTo?: string }) => {
    try {
      // Build query with date filters if provided
      let searchQuery = query;
      if (dateFrom || dateTo) {
        const from = dateFrom || "1900/01/01";
        const to = dateTo || new Date().toISOString().split("T")[0].replace(/-/g, "/");
        searchQuery += ` AND (${from}:${to}[pdat])`;
      }

      // Step 1: Search for paper IDs
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?` +
        `db=pubmed&term=${encodeURIComponent(searchQuery)}&retmax=${maxResults}&retmode=json`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      
      const paperIds = searchData.esearchresult?.idlist || [];
      
      if (paperIds.length === 0) {
        return {
          success: false,
          message: "No papers found for this query",
          papers: [],
        };
      }

      // Step 2: Fetch detailed information for each paper
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?` +
        `db=pubmed&id=${paperIds.join(",")}&retmode=json`;
      
      const summaryResponse = await fetch(summaryUrl);
      const summaryData = await summaryResponse.json();

      const papers: PubMedPaper[] = paperIds.map((id: string) => {
        const paper = summaryData.result[id];
        return {
          id: id,
          title: paper?.title || "Unknown title",
          authors: paper?.authors?.map((a: any) => a.name) || [],
          publicationDate: paper?.pubdate || "Unknown date",
          journal: paper?.source || "Unknown journal",
          doi: paper?.elocationid || undefined,
        };
      });

      return {
        success: true,
        message: `Found ${papers.length} papers`,
        totalFound: parseInt(searchData.esearchresult?.count || "0"),
        papers,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error searching PubMed: ${error instanceof Error ? error.message : "Unknown error"}`,
        papers: [],
      };
    }
  },
});

/**
 * Fetch abstract for a specific PubMed paper
 */
export const fetchPubMedAbstract = tool({
  description: "Fetch the full abstract for a specific PubMed paper using its PMID",
  
  parameters: z.object({
    pmid: z.string().describe("PubMed ID (PMID) of the paper"),
  }),
  
  execute: async ({ pmid }: { pmid: string }) => {
    try {
      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?` +
        `db=pubmed&id=${pmid}&retmode=xml`;
      
      const response = await fetch(url);
      const xmlText = await response.text();
      
      // Simple XML parsing (in production, use a proper XML parser)
      const abstractMatch = xmlText.match(/<AbstractText[^>]*>(.*?)<\/AbstractText>/);
      const titleMatch = xmlText.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/);
      
      return {
        success: true,
        pmid,
        title: titleMatch?.[1] || "Unknown title",
        abstract: abstractMatch?.[1] || "Abstract not available",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching abstract: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});
