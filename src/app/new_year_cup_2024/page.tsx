"use client";

import { useBaseData } from "@/lib/store";
import { makeCupOverviewData } from "../records/utils";
import { sumRacePoints } from "@/lib/utils";

type MemberResult = {
  member_code: string;
  point: number;
  races: number[];
};

export default function NewYearCup2024() {
  const roundData = useBaseData((state) => state.roundData).filter(
    (round) => round.cup_code === "NEWYEAR_CUP" && round.year === 2024
  );

  const blockGroups = roundData
    .filter((round) => round.round_code === "TRYOUT")
    // grouped  member data by block_code
    .reduce((acc, cur) => {
      const block_code = cur.block_code;
      if (acc[block_code]) {
        acc[block_code].push({
          member_code: cur.member_code,
        } as MemberResult);
      } else {
        acc[block_code] = [
          {
            member_code: cur.member_code,
          } as MemberResult,
        ];
      }
      return acc;
    }, {} as { [key: string]: MemberResult[] });

  console.log(blockGroups);

  return (
    <div className="p-4 flex-1 container">
      <h1 className="text-4xl font-extrabold">New Year Cup 2024</h1>
    </div>
  );
}
