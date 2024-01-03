"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useBaseData } from "@/lib/store";
import { convertMemberCodeToName, sumRacePoints } from "@/lib/utils";
import { calculateRankingPoint } from "@/app/leaderboard/util";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoundType } from "@/lib/typeDef";
import { getNameFromCode } from "@/app/records/utils";
import { Separator } from "@/components/ui/separator";

const MemberPage = () => {
  const { id } = useParams<{ id: string }>();
  const memberData = useBaseData((state) => state.memberData);
  const roundData = useBaseData((state) => state.roundData).filter(
    (round) => round.race_results !== undefined
  );

  const allRoundData = roundData.filter((round) => {
    return round.member_code === id;
  });
  const rankingPoint = calculateRankingPoint(allRoundData);

  function getRank(currentRound: RoundType) {
    // 1. filter roundData by roundType
    const roundPoints = roundData
      .filter((round) => {
        return (
          round.cup_code === currentRound.cup_code &&
          round.year === currentRound.year &&
          round.round_code === currentRound.round_code &&
          round.block_code === currentRound.block_code
        );
      })
      // 2. calculate round point
      .map((round) => {
        return {
          member_code: round.member_code,
          point: sumRacePoints(round.race_results),
        };
      })
      .sort((a, b) => {
        return b.point - a.point;
      });

    //get index by id
    const index = roundPoints.findIndex((round) => {
      return round.member_code === id;
    });

    return index + 1;
  }

  return (
    <div className="p-4 flex-1 container mx-auto">
      <Link href="/leaderboard">
        <Button className="gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </Link>
      <div className="flex gap-4 my-4 items-center">
        <Image
          src={`/members/${id}.png`}
          width={150}
          height={150}
          alt="Avatar"
        />
        <p className="flex flex-col font-notoSans">
          <span className="text-2xl font-bold">
            {memberData.find((member) => member.id === id)?.name_kr}
          </span>
          <span className="text-lg">{convertMemberCodeToName(id)}</span>
          <span className="mt-3 text-sm">랭킹 포인트</span>
          <span className="text-3xl font-bold">{rankingPoint}</span>
        </p>
      </div>
      <Separator />
      <h2 className="text-2xl font-bold my-4 font-notoSans">주요 성적</h2>
      <Table className="mb-4 font-notoSans">
        <TableHeader>
          <TableRow>
            <TableHead>대회</TableHead>
            <TableHead>라운드</TableHead>
            <TableHead>블록</TableHead>
            <TableHead>순위</TableHead>
            <TableHead>포인트</TableHead>
            <TableHead>레이스 성적</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allRoundData.map((round, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  {getNameFromCode(round.cup_code) + ` ` + round.year}
                </TableCell>
                <TableCell>{getNameFromCode(round.round_code)}</TableCell>
                <TableCell>
                  {round.block_code ? getNameFromCode(round.block_code) : `-`}
                </TableCell>
                <TableCell>{getRank(round)}위</TableCell>
                <TableCell>{sumRacePoints(round.race_results)}점</TableCell>
                <TableCell className="flex gap-2">
                  {round.race_results.map((rank, idx) => {
                    return (
                      <span
                        key={idx}
                        className="bg-slate-300 w-8 h-8 flex items-center justify-center rounded-sm font-bold"
                      >
                        {rank}
                      </span>
                    );
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberPage;
