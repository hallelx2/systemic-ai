import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

/**
 * Simple test to verify Vercel AI SDK is working
 */
async function testBasicAI() {
  console.log("🧪 Testing Vercel AI SDK...\n");
  
  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: "List 3 recent breakthroughs in AI research. Be concise."
    });
    
    console.log("✅ OpenAI GPT-4 Turbo Response:");
    console.log(text);
    console.log("\n" + "=".repeat(80) + "\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

/**
 * Test research assistant prompt
 */
async function testResearchAssistant() {
  console.log("🔬 Testing Research Assistant...\n");
  
  try {
    const topic = "machine learning in healthcare";
    
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      temperature: 0.3,
      prompt: `You are a research assistant. Find and summarize 3 key research papers about: "${topic}"

For each paper, provide:
- Title (realistic academic paper title)
- Authors (e.g., "Smith, J. & Doe, A.")
- Year (2022-2024)
- Key finding (1 sentence)

Be specific and realistic.`
    });
    
    console.log("Research Summary:");
    console.log(text);
    console.log("\n" + "=".repeat(80) + "\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

/**
 * Test Claude for writing
 */
async function testClaudeWriting() {
  console.log("✍️  Testing Claude for Academic Writing...\n");
  
  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      temperature: 0.4,
      prompt: `Write a brief academic introduction (3-4 sentences) about the importance of AI in medical diagnostics. Use formal academic tone.`
    });
    
    console.log("Academic Writing Sample:");
    console.log(text);
    console.log("\n" + "=".repeat(80) + "\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

/**
 * Test PubMed API directly (no AI)
 */
async function testPubMedAPI() {
  console.log("🔍 Testing PubMed API...\n");
  
  try {
    const query = "machine learning cancer diagnosis";
    const maxResults = 5;
    
    // Step 1: Search
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    const paperIds = searchData.esearchresult?.idlist || [];
    console.log(`Found ${searchData.esearchresult?.count || 0} papers total`);
    console.log(`Fetching details for ${paperIds.length} papers...\n`);
    
    if (paperIds.length === 0) {
      console.log("No papers found");
      return;
    }
    
    // Step 2: Get details
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${paperIds.join(",")}&retmode=json`;
    const summaryResponse = await fetch(summaryUrl);
    const summaryData = await summaryResponse.json();
    
    paperIds.forEach((id: string, index: number) => {
      const paper = summaryData.result[id];
      console.log(`${index + 1}. ${paper?.title || "Unknown"}`);
      console.log(`   PMID: ${id}`);
      console.log(`   Authors: ${paper?.authors?.slice(0, 3).map((a: any) => a.name).join(", ")}${paper?.authors?.length > 3 ? ", et al." : ""}`);
      console.log(`   Journal: ${paper?.source || "Unknown"}`);
      console.log(`   Date: ${paper?.pubdate || "Unknown"}`);
      console.log("");
    });
    
    console.log("=".repeat(80) + "\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run all tests
async function runTests() {
  console.log("🚀 Starting AI SDK Tests\n");
  console.log("=".repeat(80) + "\n");
  
  await testBasicAI();
  await testResearchAssistant();
  await testClaudeWriting();
  await testPubMedAPI();
  
  console.log("✅ All tests completed!");
}

runTests();
