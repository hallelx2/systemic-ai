import { z } from "zod";

export const researchInputSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters"),
  researchType: z.enum(["systematic", "literature", "meta-analysis", "quick"]),
  focusAreas: z.array(z.string()).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  maxPapers: z.number().min(5).max(100).default(20),
  databases: z.array(z.enum(["pubmed", "arxiv", "scholar"])).default(["pubmed"]),
});

export type ResearchInput = z.infer<typeof researchInputSchema>;

export const paperSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  publicationDate: z.string(),
  journal: z.string().optional(),
  abstract: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().optional(),
  relevanceScore: z.number().optional(),
  source: z.enum(["pubmed", "arxiv", "scholar", "manual"]).default("pubmed"),
});

export type Paper = z.infer<typeof paperSchema>;

export const researchSummarySchema = z.object({
  topic: z.string(),
  overview: z.string(),
  keyPapers: z.array(z.object({
    title: z.string(),
    authors: z.string(),
    year: z.string(),
    journal: z.string().optional(),
    keyFinding: z.string(),
  })),
  themes: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })),
  gaps: z.array(z.string()),
  futureDirections: z.array(z.string()),
});

export type ResearchSummary = z.infer<typeof researchSummarySchema>;
