import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const fetchWithTimeout = async (url: string, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'SynthesisAI/1.0 (mailto:contact@synthesisai.com)'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { pmid } = await req.json();

    if (!pmid) {
      return NextResponse.json(
        { error: "PMID is required" },
        { status: 400 },
      );
    }

    const pubmedUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=xml&rettype=abstract`;
    const response = await fetchWithTimeout(pubmedUrl, 15000);
    
    if (!response.ok) {
      throw new Error(`PubMed API returned ${response.status}`);
    }
    
    const xmlData = await response.text();

    if (!xmlData.includes("<PubmedArticle>")) {
      return NextResponse.json(
        { error: "Paper not found. Please check the PMID." },
        { status: 404 },
      );
    }

    const titleMatch = xmlData.match(
      /<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/,
    );
    const abstractMatch = xmlData.match(
      /<AbstractText.*?>([\s\S]*?)<\/AbstractText>/,
    );

    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]*>/g, "").trim()
      : "Title not available";
    const abstract = abstractMatch
      ? abstractMatch[1].replace(/<[^>]*>/g, "").trim()
      : "Abstract not available";

    const authorMatches = xmlData.matchAll(
      /<Author.*?><LastName>(.*?)<\/LastName><ForeName>(.*?)<\/ForeName>/g,
    );
    const authors = Array.from(authorMatches)
      .slice(0, 3)
      .map((match) => `${match[2]} ${match[1]}`)
      .join(", ");

    const { text: summary } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: `Analyze this research paper and provide a concise 2-3 sentence summary of the key findings and implications.

Title: ${title}

Abstract: ${abstract}

Provide only the summary, no preamble.`,
    });

    const searchTerms = title.split(" ").slice(0, 5).join(" ");
    const relatedUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerms)}&retmax=6&retmode=json`;
    
    let relatedPapers: Array<{ title: string; pmid: string }> = [];
    
    try {
      const relatedResponse = await fetchWithTimeout(relatedUrl, 10000);
      const relatedData = await relatedResponse.json();

      const relatedPmids =
        relatedData.esearchresult?.idlist?.filter(
          (id: string) => id !== pmid,
        ) || [];

      relatedPapers = await Promise.all(
        relatedPmids.slice(0, 3).map(async (id: string) => {
          try {
            const paperUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${id}&retmode=xml&rettype=abstract`;
            const paperResponse = await fetchWithTimeout(paperUrl, 8000);
            const paperXml = await paperResponse.text();
            const paperTitleMatch = paperXml.match(
              /<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/,
            );
            const paperTitle = paperTitleMatch
              ? paperTitleMatch[1].replace(/<[^>]*>/g, "").trim()
              : "Unknown";
            return { title: paperTitle, pmid: id };
          } catch {
            return { title: "Paper unavailable", pmid: id };
          }
        }),
      );
    } catch (error) {
      console.warn("Failed to fetch related papers:", error);
    }

    return NextResponse.json({
      title,
      authors: authors || "Authors not available",
      summary,
      relatedPapers,
    });
  } catch (error: any) {
    console.error("Error analyzing paper:", error);
    
    if (error.name === 'AbortError' || error.code === 'ETIMEDOUT') {
      return NextResponse.json(
        { error: "PubMed API timeout. Please try again." },
        { status: 504 },
      );
    }
    
    return NextResponse.json(
      { error: "Failed to analyze paper. Please check the PMID and try again." },
      { status: 500 },
    );
  }
}
