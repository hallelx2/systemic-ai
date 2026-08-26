"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  publicationDate: string;
  journal?: string;
  doi?: string;
}

export function PubMedSearch() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [totalFound, setTotalFound] = useState(0);

  async function handleSearch() {
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsSearching(true);
    const loadingToast = toast.loading("Searching PubMed...");

    try {
      const response = await fetch("/api/research/search-pubmed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          maxResults: 10,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setPapers(data.papers || []);
      setTotalFound(data.totalFound || 0);
      
      toast.dismiss(loadingToast);
      toast.success(`Found ${data.totalFound} papers`);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : "Search failed");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            PubMed Search
          </CardTitle>
          <CardDescription>
            Search for research papers in the PubMed database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Query</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="e.g., machine learning cancer diagnosis"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                disabled={isSearching}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {totalFound > 0 && (
            <p className="text-sm text-muted-foreground">
              Found {totalFound.toLocaleString()} papers (showing {papers.length})
            </p>
          )}
        </CardContent>
      </Card>

      {papers.length > 0 && (
        <div className="space-y-4">
          {papers.map((paper) => (
            <Card key={paper.id}>
              <CardHeader>
                <CardTitle className="text-base">{paper.title}</CardTitle>
                <CardDescription>
                  <div className="space-y-1">
                    <p>
                      {paper.authors.slice(0, 3).join(", ")}
                      {paper.authors.length > 3 && ", et al."}
                    </p>
                    <p>
                      {paper.journal} • {paper.publicationDate}
                    </p>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${paper.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on PubMed
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                  {paper.doi && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DOI
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
