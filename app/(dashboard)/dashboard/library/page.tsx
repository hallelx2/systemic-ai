"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResearchList } from "@/components/library/research-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Research Library</h1>
          <p className="text-muted-foreground">
            Manage your research projects and papers
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Papers
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Research</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="papers">Papers</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ResearchList type="all" />
        </TabsContent>
        <TabsContent value="reviews">
          <ResearchList type="reviews" />
        </TabsContent>
        <TabsContent value="papers">
          <ResearchList type="papers" />
        </TabsContent>
        <TabsContent value="drafts">
          <ResearchList type="drafts" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
