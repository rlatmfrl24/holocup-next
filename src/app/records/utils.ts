import { CupInfoType, RoundType } from "@/lib/typeDef";

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

function makeETCOvrData(cupCode: string, data: RoundType[]) {
  const cupRounds = data.filter((round) => round.cup_code === cupCode);
}

function sumRacePoints(race_results: number[]) {
  const point_table: { [key: number]: number } = {
    1: 15,
    2: 12,
    3: 10,
    4: 9,
    5: 8,
    6: 7,
    7: 6,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1,
  };

  return race_results.reduce((acc, cur) => {
    return acc + (point_table[cur] ? point_table[cur] : 0);
  }, 0);
}

function convertMemberCodeToName(memberCode: string) {
  return (
    memberCode
      .replaceAll("_", " ")
      // capitalize first letter of each word
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
  );
}

export {
  makeCupOverviewData,
  makeETCOvrData,
  sumRacePoints,
  convertMemberCodeToName,
};
