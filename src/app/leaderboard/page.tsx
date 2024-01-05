"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBaseData } from "@/lib/store";
import { calculateRankingPoint } from "./util";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { convertMemberCodeToName } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Leaderboard = () => {
  const roundData = useBaseData((state) => state.roundData);
  const memberData = useBaseData((state) => state.memberData);

  const router = useRouter();

  const rankingData = memberData
    .map((member) => {
      const allRoundData = roundData.filter((round) => {
        return round.member_code === member.id;
      });

      return {
        member_code: member.id,
        member_ranking_point: calculateRankingPoint(allRoundData),
      };
    })
    .filter((member) => {
      return member.member_ranking_point > 0;
    })
    .sort((a, b) => {
      return b.member_ranking_point - a.member_ranking_point;
    });

  return (
    <div className="p-4 flex-1 container mx-auto">
      <h1 className="text-4xl font-extrabold mb-3">Leaderboard</h1>
      <Table className="mb-4 font-notoSans">
        <TableHeader>
          <TableRow>
            <TableHead className="w-28 text-center">Rank</TableHead>
            <TableHead>Member</TableHead>
            <TableHead className="w-32 text-right">Ranking Point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankingData.map((member, index) => {
            return (
              <TableRow
                key={member.member_code}
                onClick={() => {
                  router.push(`/member/${member.member_code}`);
                }}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="flex gap-3 items-center">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src={`/members/` + member.member_code + `.png`}
                      alt="Avatar"
                    />
                  </Avatar>
                  <p className="flex flex-col flex-1 mr-10">
                    <span className="text-lg font-bold">
                      {memberData.find(
                        (memberInfo) => memberInfo.id === member.member_code
                      )?.name_kr ?? ""}
                    </span>
                    <span className="text-xs">
                      {convertMemberCodeToName(member.member_code)}
                    </span>
                  </p>
                </TableCell>
                <TableCell className="text-right text-xl font-semibold">
                  {member.member_ranking_point.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
