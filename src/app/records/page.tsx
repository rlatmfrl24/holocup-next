"use client";

import Overview from "./components/overview";
import CupSelector from "./components/cup_selector";
import RoundSelector from "./components/round_selector";
import RoundChart from "./components/round_chart";
import RoundLeaderboard from "./components/round_leaderboard";
import { useState } from "react";
import { useSelectorState } from "./store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Records() {
  const [tabValue, setTabValue] = useState("overview");
  const currentCup = useSelectorState((state) => state.currentCup);

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
          {currentCup ? (
            <div className="flex gap-2">
              <RoundChart />
              <RoundLeaderboard />
            </div>
          ) : (
            <Alert variant={"default"}>
              <AlertTitle>대회를 선택해주세요!</AlertTitle>
              <AlertDescription>
                대회를 선택하지 않으면 기록을 볼 수 없습니다.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
