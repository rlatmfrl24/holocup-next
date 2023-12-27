"use client";

import { useCurrentCup } from "../store";
import CupOverview from "./cup_overview";
import EtcOverview from "./etc_overview";

const Overview = () => {
  const currentCup = useCurrentCup((state) => state.currentCup);

  return currentCup?.type === "NEWYEAR_CUP" ? <CupOverview /> : <EtcOverview />;
};

export default Overview;
