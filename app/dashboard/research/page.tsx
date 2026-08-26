import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StreamingResearchGenerator } from "@/modules/research/components/streaming-research-generator";
import { PubMedSearch } from "@/modules/research/components/pubmed-search";

export default async function ResearchPage() {
  // Server-side authentication
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Research Tools</h1>
        <p className="text-muted-foreground">
          AI-powered research generation with real-time streaming and academic paper search
        </p>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generator">AI Generator (Streaming)</TabsTrigger>
          <TabsTrigger value="search">PubMed Search</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <StreamingResearchGenerator />
        </TabsContent>

        <TabsContent value="search">
          <PubMedSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
}
