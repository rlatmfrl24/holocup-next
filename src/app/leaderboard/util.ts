import { RoundType } from "@/lib/typeDef";
import { sumRacePoints } from "@/lib/utils";

function calculateRankingPoint(roundDataList: RoundType[]) {
  const decayFactor = 0.9; // Adjust the decay factor as needed
  const competitionWeights: Record<string, number> = {
    TRYOUT: 0.6,
    JAKOCUP: 0.5,
    CHAMPIONSHIP: 2.5,
    ETC: 0.8,
  };

  const CurrentYear = new Date().getFullYear();

  const PointList = roundDataList
    .filter((roundData) => roundData.race_results !== undefined)
    .map((roundData, index, array) => {
      return {
        point: sumRacePoints(roundData.race_results),
        round_code: roundData.round_code,
        year: roundData.year,
        weight: competitionWeights[roundData.round_code],
        decay: Math.pow(decayFactor, CurrentYear - roundData.year + 1),
        weightMultiplier: 1 / array.length, // 각 라운드에 대한 공정한 가중치
      };
    });

  // Calculate Overall Ranking Point
  let overallRankingPoint = 0;

  PointList.forEach((pointData) => {
    const { point, weight, decay, weightMultiplier } = pointData;
    overallRankingPoint += point * weight * decay * weightMultiplier;
  });

  return overallRankingPoint;
}

export { calculateRankingPoint };
