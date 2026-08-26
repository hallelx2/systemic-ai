import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

export const models = {
  // Google Gemini Models (PRIMARY)
  gemini2Flash: google("gemini-2.0-flash-exp"),
  gemini15Pro: google("gemini-1.5-pro-latest"),
  gemini15Flash: google("gemini-1.5-flash-latest"),
  
  // Anthropic Models (BACKUP)
  claude3Opus: anthropic("claude-3-opus-20240229"),
  claude3Sonnet: anthropic("claude-3-5-sonnet-20241022"),
  claude3Haiku: anthropic("claude-3-5-haiku-20241022"),
} as const;

export const agentModels = {
  // Agent assignments based on task requirements
  searchAgent: models.gemini2Flash,         // Fast query formulation
  analysisAgent: models.gemini15Pro,        // Deep comprehension
  synthesisAgent: models.gemini15Pro,       // Advanced reasoning
  writingAgent: models.gemini15Pro,         // High-quality writing
  citationAgent: models.gemini15Flash,      // Structured formatting
  coordinatorAgent: models.gemini15Pro,     // Orchestration
} as const;
