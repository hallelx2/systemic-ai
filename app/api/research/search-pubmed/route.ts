import { NextRequest, NextResponse } from "next/server";

interface PubMedPaper {
  id: string;
  title: string;
  authors: string[];
  publicationDate: string;
  journal?: string;
  doi?: string;
}

/**
 * PubMed Search API
 * Searches PubMed database and returns paper metadata
 */
export async function POST(request: NextRequest) {
  try {
    const { query, maxResults = 20, dateFrom, dateTo } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Build query with date filters
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
    const totalFound = parseInt(searchData.esearchresult?.count || "0");
    
    if (paperIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No papers found for this query",
        papers: [],
        totalFound: 0,
        query: searchQuery,
      });
    }

    // Step 2: Fetch detailed information
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

    return NextResponse.json({
      success: true,
      message: `Found ${papers.length} papers`,
      totalFound,
      papers,
      query: searchQuery,
    });
  } catch (error) {
    console.error("PubMed search error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search PubMed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
