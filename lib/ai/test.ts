import { simpleResearchAgent, advancedResearchAgent, streamingResearchAgent } from "./agents/test-agent";
import { searchAgent, quickPubMedSearch } from "./agents/search-agent";

async function testSimpleAgent() {
  console.log("🧪 Testing Simple Research Agent...\n");
  
  const result = await simpleResearchAgent("machine learning in healthcare");
  
  console.log("Result:");
  console.log(result);
  console.log("\n" + "=".repeat(80) + "\n");
}

async function testAdvancedAgent() {
  console.log("🧪 Testing Advanced Research Agent...\n");
  
  const result = await advancedResearchAgent(
    "deep learning for medical imaging",
    ["CNN architectures", "diagnostic accuracy", "clinical applications"]
  );
  
  console.log("Result:");
  console.log(result.summary);
  console.log("\n" + "=".repeat(80) + "\n");
}

async function testStreamingAgent() {
  console.log("🧪 Testing Streaming Research Agent...\n");
  
  const result = await streamingResearchAgent("AI-powered drug discovery");
  
  console.log("Result:");
  console.log(result);
  console.log("\n" + "=".repeat(80) + "\n");
}

async function testPubMedSearch() {
  console.log("🧪 Testing PubMed Quick Search...\n");
  
  const result = await quickPubMedSearch("machine learning cancer diagnosis", 5);
  
  console.log("Success:", result.success);
  console.log("Message:", result.message);
  console.log("Total Found:", result.totalFound);
  console.log("\nFirst 3 papers:");
  result.papers.slice(0, 3).forEach((paper: any, i: number) => {
    console.log(`\n${i + 1}. ${paper.title}`);
    console.log(`   Authors: ${paper.authors.slice(0, 3).join(", ")}${paper.authors.length > 3 ? ", et al." : ""}`);
    console.log(`   Journal: ${paper.journal}`);
    console.log(`   Date: ${paper.publicationDate}`);
  });
  console.log("\n" + "=".repeat(80) + "\n");
}

async function testSearchAgent() {
  console.log("🧪 Testing AI Search Agent (with reasoning)...\n");
  
  const result = await searchAgent({
    topic: "CRISPR gene editing in cancer therapy",
    maxPapers: 10,
    dateFrom: "2022/01/01",
    focusAreas: ["clinical trials", "safety", "efficacy"]
  });
  
  console.log("Search Strategy:");
  console.log(result.searchStrategy);
  console.log("\nTotal papers found:", result.totalFound);
  console.log("Papers retrieved:", result.papers.length);
  
  if (result.papers.length > 0) {
    console.log("\nFirst 2 papers:");
    result.papers.slice(0, 2).forEach((paper: any, i: number) => {
      console.log(`\n${i + 1}. ${paper.title}`);
      console.log(`   PMID: ${paper.id}`);
      console.log(`   Authors: ${paper.authors.slice(0, 2).join(", ")}${paper.authors.length > 2 ? ", et al." : ""}`);
    });
  }
  console.log("\n" + "=".repeat(80) + "\n");
}

async function runAllTests() {
  console.log("🚀 Starting AI Agent Tests\n");
  console.log("=".repeat(80) + "\n");
  
  try {
    // Test 1: Simple agent (just AI, no tools)
    await testSimpleAgent();
    
    // Test 2: Advanced agent (AI with structured thinking)
    await testAdvancedAgent();
    
    // Test 3: Streaming agent (longer responses)
    await testStreamingAgent();
    
    // Test 4: PubMed API (no AI)
    await testPubMedSearch();
    
    // Test 5: Search agent (AI + PubMed tools)
    await testSearchAgent();
    
    console.log("✅ All tests completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run tests
runAllTests();
