"use client";

import Overview from "./components/overview";
import CupSelector from "./components/cup_selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoundSelector from "./components/round_selector";
import { useState } from "react";
import RoundChart from "./components/round_chart";
import RoundLeaderboard from "./components/round_leaderboard";

export default function Records() {
  const [tabValue, setTabValue] = useState("overview");

  return (
    <div className="p-4 flex-1 container mx-auto">
      <h1 className="text-4xl font-extrabold mb-3">Records</h1>
      <Tabs defaultValue="overview">
        <div className="flex">
          <TabsList className="mr-2">
            <TabsTrigger
              value="overview"
              onClick={() => setTabValue("overview")}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger value="rounds" onClick={() => setTabValue("rounds")}>
              Rounds
            </TabsTrigger>
          </TabsList>
          <CupSelector />
          {tabValue === "rounds" && <RoundSelector />}
        </div>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="rounds">
          <div className="flex gap-2">
            <RoundChart />
            <RoundLeaderboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
