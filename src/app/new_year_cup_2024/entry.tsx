"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useBaseData } from "@/lib/store";
import { convertMemberCodeToName } from "@/lib/utils";
import { calculateRankingPoint } from "../leaderboard/util";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Entry = () => {
  const router = useRouter();
  const roundData = useBaseData((state) => state.roundData);
  const memberData = useBaseData((state) => state.memberData);
  const entryData = roundData.filter(
    (round) => round.cup_code === "NEWYEAR_CUP" && round.year === 2024
  );

  const blockGroups = entryData
    // filter by round_code
    .filter((round) => round.round_code === "TRYOUT")
    // grouped  member data by block_code
    .reduce((acc, cur) => {
      if (!acc[cur.block_code]) {
        acc[cur.block_code] = [];
      }
      acc[cur.block_code].push(cur);
      return acc;
    }, {} as { [key: string]: typeof entryData });

  // make empty array for block data
  const blockData: {
    [key: string]: {
      member_code: string;
      ranking_point: number;
      rounds: typeof entryData;
    }[];
  } = {};

  // make block data
  Object.keys(blockGroups).forEach((block_code) => {
    const block = blockGroups[block_code];
    const list = block.map((member) => {
      const round = roundData
        .filter((round) => round.race_results !== undefined)
        .filter((round) => round.member_code === member.member_code)
        // sort by round_code
        .sort((a, b) => {
          const roundCode = ["TRYOUT", "JAKOCUP", "CHAMPIONSHIP"];
          return (
            roundCode.findIndex((code) => code === b.round_code) -
            roundCode.findIndex((code) => code === a.round_code)
          );
        })
        .sort((a, b) => b.year - a.year);

      return {
        member_code: member.member_code,
        ranking_point: calculateRankingPoint(round),
        rounds: round,
      };
    });
    blockData[block_code] = list.sort(
      (a, b) => b.ranking_point - a.ranking_point
    );
  });

  return (
    <div className="flex gap-3 mt-4">
      {Object.entries(blockData).map(([key, value]) => {
        return (
          <Card key={key} className="flex-1 mb-4">
            <CardHeader>
              <CardTitle>
                {convertMemberCodeToName(key.toLocaleLowerCase())}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead className="text-right">Ranking Point</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {value.map((member, index) => {
                    return (
                      <TableRow
                        key={member.member_code}
                        className={
                          index < 4
                            ? "bg-green-100 hover:bg-green-200 cursor-pointer"
                            : index > value.length - 5
                            ? "bg-red-100 hover:bg-red-200 cursor-pointer"
                            : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        }
                        onClick={() => {
                          router.push(`/member/${member.member_code}`);
                        }}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="mr-2">
                              <AvatarImage
                                src={`/members/` + member.member_code + `.png`}
                                alt="Avatar"
                              />
                            </Avatar>
                            <p className="flex flex-col flex-1">
                              <span className="font-semibold font-notoSans text-lg">
                                {memberData.find(
                                  (memberInfo) =>
                                    memberInfo.id === member.member_code
                                )?.name_kr ?? ""}
                              </span>
                              <span className="text-xs">
                                {convertMemberCodeToName(member.member_code)}
                              </span>
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-bold text-xl">
                            {!Number.isNaN(member.ranking_point)
                              ? member.ranking_point.toFixed(2)
                              : "-"}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Entry;
