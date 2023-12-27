"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCurrentCup } from "../store";
import CupOverview from "./cup_overview";
import EtcOverview from "./etc_overview";

const Overview = () => {
  const currentCup = useCurrentCup((state) => state.currentCup);

  return currentCup ? (
    currentCup?.type === "NEWYEAR_CUP" ? (
      <CupOverview />
    ) : (
      <EtcOverview />
    )
  ) : (
    <Alert variant={"default"}>
      <AlertTitle>대회를 선택해주세요!</AlertTitle>
      <AlertDescription>
        대회를 선택하지 않으면 기록을 볼 수 없습니다.
      </AlertDescription>
    </Alert>
  );
};

export default Overview;
