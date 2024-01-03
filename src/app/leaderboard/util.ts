import { RoundType } from "@/lib/typeDef";
import { sumRacePoints } from "@/lib/utils";

function calculateRankingPoint(roundDataList: RoundType[]) {
  const PointList = roundDataList
    .filter((roundData) => roundData.race_results !== undefined)
    .map((roundData) => {
      let modifiedPoint = sumRacePoints(roundData.race_results);
      let threshold = 0;

      if (roundData.round_code === "TRYOUT") {
        threshold = 0.85;
      } else if (roundData.round_code === "CHAMPIONSHIP") {
        threshold = 2;
      } else if (roundData.round_code === "JAKOCUP") {
        threshold = 0.5;
      } else {
        threshold = 1;
      }

      modifiedPoint = modifiedPoint * threshold;

      const currentYear = new Date().getFullYear();
      threshold = 1 - Math.abs(currentYear - roundData.year) * 0.1;
      modifiedPoint = modifiedPoint * threshold;

      return modifiedPoint;
    });

  const sum = PointList.reduce((a, b) => a + b, 0);
  const avg = sum / PointList.length;

  const roundedAvg = Math.round((avg + Number.EPSILON) * 100) / 100;

  return roundedAvg;
}

export { calculateRankingPoint };
