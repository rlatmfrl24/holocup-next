import { CupInfoType, RoundType } from "@/lib/typeDef";
import { sumRacePoints } from "@/lib/utils";

type MemberResult = {
  member_code: string;
  point: number;
  races: number[];
};

function makeCupOverviewData(
  cupInfo: CupInfoType,
  data: RoundType[]
): {
  champion: MemberResult;
  secondWinner: MemberResult;
  thirdWinner: MemberResult;
  jakocupWinner: MemberResult;
  jakocupLastOne: MemberResult;
  blockGroups: { [key: string]: MemberResult[] };
} {
  const cupRounds = data.filter(
    (round) => round.cup_code === "NEWYEAR_CUP" && round.year === cupInfo.year
  );

  const championshipResult = cupRounds
    .filter((round) => round.round_code === "CHAMPIONSHIP")
    .map((round) => {
      return {
        member_code: round.member_code,
        point: sumRacePoints(round.race_results),
        races: round.race_results,
      };
    });

  const jakocupResult = cupRounds
    .filter((round) => round.round_code === "JAKOCUP")
    .map((round) => {
      return {
        member_code: round.member_code,
        point: sumRacePoints(round.race_results),
        races: round.race_results,
      };
    });

  const blockGroups = cupRounds
    .filter((round) => round.round_code === "TRYOUT")
    // grouped  member data by block_code
    .reduce((acc, cur) => {
      const block_code = cur.block_code;
      if (acc[block_code]) {
        acc[block_code].push({
          member_code: cur.member_code,
          point: sumRacePoints(cur.race_results),
          races: cur.race_results,
        } as MemberResult);
      } else {
        acc[block_code] = [
          {
            member_code: cur.member_code,
            point: sumRacePoints(cur.race_results),
            races: cur.race_results,
          } as MemberResult,
        ];
      }
      return acc;
    }, {} as { [key: string]: MemberResult[] });

  // get winners of championship
  const champion = championshipResult.sort((a, b) => b.point - a.point)[0];
  const secondWinner = championshipResult
    .sort((a, b) => b.point - a.point)
    .slice(1, 2)[0];
  const thirdWinner = championshipResult
    .sort((a, b) => b.point - a.point)
    .slice(2, 3)[0];

  // get members of jakocup
  const jakocupWinner = jakocupResult.sort((a, b) => b.point - a.point)[0];
  const jakocupLastOne = jakocupResult
    .sort((a, b) => b.point - a.point)
    .slice(-1)[0];

  return {
    champion,
    secondWinner,
    thirdWinner,
    jakocupWinner,
    jakocupLastOne,
    blockGroups,
  };
}

function makeETCOverviewData(cupInfo: CupInfoType, data: RoundType[]) {
  const cupRounds = data.filter(
    (round) => round.cup_code === cupInfo.type && round.year === cupInfo.year
  );

  const memberList = cupRounds
    .map((round) => round.member_code)
    .filter((member_code, index, self) => {
      return self.indexOf(member_code) === index;
    });

  // calculate point of single race
  const highestScore = cupRounds
    .map((round) => {
      return {
        member_code: round.member_code,
        point: sumRacePoints(round.race_results),
        races: round.race_results,
      } as MemberResult;
    })
    .sort((a, b) => b.point - a.point)
    //remove duplicate member_code
    .filter((result, index, self) => {
      return self.findIndex((r) => r.member_code === result.member_code) ===
        index
        ? true
        : false;
    });

  // caculate total point of each member
  const totalPoint = cupRounds.reduce((acc, cur) => {
    const currentPoint = sumRacePoints(cur.race_results);
    if (acc[cur.member_code]) {
      acc[cur.member_code] += currentPoint;
    } else {
      acc[cur.member_code] = currentPoint;
    }
    return acc;
  }, {} as { [key: string]: number });
  // convert object to array
  const totalPointArray = Object.entries(totalPoint)
    .map(([key, value]) => ({
      member_code: key,
      point: value,
    }))
    .sort((a, b) => b.point - a.point);

  // calculate high-rank of each member
  const highRankCount = cupRounds.reduce((acc, cur) => {
    const currentFirstCount = cur.race_results.filter(
      (result) => result < 4
    ).length;
    if (acc[cur.member_code]) {
      acc[cur.member_code] += currentFirstCount;
    } else {
      acc[cur.member_code] = currentFirstCount;
    }
    return acc;
  }, {} as { [key: string]: number });
  // convert object to array
  const highRankCountArray = Object.entries(highRankCount)
    .map(([key, value]) => ({
      member_code: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count);

  const lowestRankCount = cupRounds.reduce((acc, cur) => {
    const currentLowestRankCount = cur.race_results.filter(
      (result) => result > memberList.length - 2
    ).length;
    if (acc[cur.member_code]) {
      acc[cur.member_code] += currentLowestRankCount;
    } else {
      acc[cur.member_code] = currentLowestRankCount;
    }
    return acc;
  }, {} as { [key: string]: number });
  // convert object to array
  const lowestRankCountArray = Object.entries(lowestRankCount)
    .map(([key, value]) => ({
      member_code: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count);

  // group by block_code
  const blockGroups = cupRounds.reduce((acc, cur) => {
    const block_code = cur.block_code;
    if (acc[block_code]) {
      acc[block_code].push({
        member_code: cur.member_code,
        point: sumRacePoints(cur.race_results),
        races: cur.race_results,
      } as MemberResult);
    } else {
      acc[block_code] = [
        {
          member_code: cur.member_code,
          point: sumRacePoints(cur.race_results),
          races: cur.race_results,
        } as MemberResult,
      ];
    }
    return acc;
  }, {} as { [key: string]: MemberResult[] });

  return {
    highestScore,
    totalPointArray,
    highRankCountArray,
    lowestRankCountArray,
    blockGroups,
  };
}

function getNameFromCode(code: string) {
  switch (code) {
    case "NEWYEAR_CUP":
      return "정월컵";
    case "ENIDTNMT":
      return "EN ID 토너먼트";
    case "YURUHOLO":
      return "유루홀로";
    case "TRYOUT":
      return "예선";
    case "CHAMPIONSHIP":
      return "본선";
    case "JAKOCUP":
      return "자코컵";
    case "SUFFLE":
      return "셔플 라운드";
    case "EN_VS_ID":
      return "EN vs ID 라운드";
    case "ALL_STAR":
      return "올스타전";
    default:
      if (code.startsWith("BLOCK")) {
        return "블록 " + code.slice(6);
      }
      if (code.startsWith("TEAM_ROUND")) {
        return "팀 라운드 " + code.slice(11);
      }
      if (code.startsWith("TRIO_ROUND")) {
        return "트리오 라운드 " + code.slice(11);
      }
      if (code.startsWith("SOLO_ROUND")) {
        return "솔로 라운드 " + code.slice(11);
      }
      return "기타";
  }
}

export { makeCupOverviewData, makeETCOverviewData, getNameFromCode };
