"use client";

import RaceResults from "@/components/race_results";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useBaseData } from "@/lib/store";
import { RoundType } from "@/lib/typeDef";
import { convertMemberCodeToName, sumRacePoints } from "@/lib/utils";

const GroupStage = ({ memberRoundData }: { memberRoundData: RoundType[] }) => {
  const memberData = useBaseData((state) => state.memberData);
  const roundData = useBaseData((state) => state.roundData);

  return (
    <div className="my-4">
      <Table className="font-notoSans mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>멤버</TableHead>
            <TableHead>예선 성적</TableHead>
            <TableHead>레이스 결과</TableHead>
            <TableHead>본선 성적</TableHead>
            <TableHead>총점</TableHead>
            <TableHead>결과</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberRoundData
            .sort((a, b) => {
              return (
                getTryoutScore(roundData, b.member_code) +
                sumRacePoints(b.race_results, memberRoundData.length) -
                (getTryoutScore(roundData, a.member_code) +
                  sumRacePoints(a.race_results, memberRoundData.length))
              );
            })
            .map((round, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}위</TableCell>
                  <TableCell>
                    <div className="flex">
                      <Avatar>
                        <AvatarImage
                          src={`/members/` + round.member_code + `.png`}
                          alt={round.member_code}
                        />
                      </Avatar>
                      <p className="flex flex-col">
                        <span className="ml-2 font-bold text-base">
                          {memberData.find(
                            (memberInfo) => memberInfo.id === round.member_code
                          )?.name_kr ?? ""}
                        </span>
                        <span className="ml-2 text-xs font-normal">
                          {convertMemberCodeToName(round.member_code)}
                        </span>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="items-center text-xl font-semibold">
                    {getTryoutScore(roundData, round.member_code)}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {round.race_results !== undefined && (
                      <RaceResults race_results={round.race_results} />
                    )}
                  </TableCell>
                  <TableCell>
                    {sumRacePoints(round.race_results, memberRoundData.length)}
                  </TableCell>
                  <TableCell className="items-center text-xl font-semibold">
                    {getTryoutScore(roundData, round.member_code) +
                      sumRacePoints(round.race_results, memberRoundData.length)}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {getStatus(round.member_code, roundData)}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

function getTryoutScore(roundData: RoundType[], memberCode: string) {
  const memberBlockCode = roundData.find((round) => {
    return (
      round.round_code === "TRYOUT" &&
      round.year === 2024 &&
      round.cup_code === "NEWYEAR_CUP" &&
      round.member_code === memberCode
    );
  })?.block_code;

  const tryDataRounds = roundData.filter((round) => {
    return (
      round.round_code === "TRYOUT" &&
      round.year === 2024 &&
      round.cup_code === "NEWYEAR_CUP" &&
      round.block_code === memberBlockCode
    );
  });

  const memberTryoutRound = tryDataRounds.find((round) => {
    return round.member_code === memberCode;
  });

  return sumRacePoints(memberTryoutRound!.race_results, tryDataRounds.length);
}

function getStatus(memberCode: string, wholeRounds: RoundType[]) {
  const getGroupDData = wholeRounds.filter((round) => {
    return (
      round.round_code === "GROUP_STAGE" &&
      round.year === 2024 &&
      round.cup_code === "NEWYEAR_CUP" &&
      round.block_code === "BLOCK_D"
    );
  });

  const getGroupEData = wholeRounds.filter((round) => {
    return (
      round.round_code === "GROUP_STAGE" &&
      round.year === 2024 &&
      round.cup_code === "NEWYEAR_CUP" &&
      round.block_code === "BLOCK_E"
    );
  });

  const getGroupFData = wholeRounds.filter((round) => {
    return (
      round.round_code === "GROUP_STAGE" &&
      round.year === 2024 &&
      round.cup_code === "NEWYEAR_CUP" &&
      round.block_code === "BLOCK_F"
    );
  });

  const groupDFirst = getGroupDData.sort((a, b) => {
    return (
      sumRacePoints(b.race_results, getGroupDData.length) -
      sumRacePoints(a.race_results, getGroupDData.length)
    );
  })[0].member_code;

  const groupEFirst = getGroupEData.sort((a, b) => {
    return (
      sumRacePoints(b.race_results, getGroupEData.length) -
      sumRacePoints(a.race_results, getGroupEData.length)
    );
  })[0].member_code;

  const groupFFirst = getGroupFData.sort((a, b) => {
    return (
      sumRacePoints(b.race_results, getGroupFData.length) -
      sumRacePoints(a.race_results, getGroupFData.length)
    );
  })[0].member_code;

  const exceptFirstRounds = wholeRounds
    .filter((round) => {
      return (
        round.round_code === "GROUP_STAGE" &&
        round.year === 2024 &&
        round.cup_code === "NEWYEAR_CUP"
      );
    })
    .filter((round) => {
      return (
        round.member_code !== groupDFirst &&
        round.member_code !== groupEFirst &&
        round.member_code !== groupFFirst
      );
    });

  const totalResult = exceptFirstRounds.map((round) => {
    const groupMemberRounds = wholeRounds.filter((group) => {
      return (
        group.round_code === "GROUP_STAGE" &&
        group.year === 2024 &&
        group.cup_code === "NEWYEAR_CUP" &&
        group.block_code === round.block_code
      );
    });

    const groupScore = sumRacePoints(
      round.race_results,
      groupMemberRounds.length
    );

    return {
      member: round.member_code,
      tryoutScore: getTryoutScore(wholeRounds, round.member_code),
      groupScore: groupScore,
      totalScore: getTryoutScore(wholeRounds, round.member_code) + groupScore,
    };
  });

  const sorted = totalResult.sort((a, b) => {
    return b.tryoutScore + b.groupScore - (a.tryoutScore + a.groupScore);
  });

  //find member's index
  const memberIndex = sorted.findIndex((result) => {
    return result.member === memberCode;
  });

  if (memberIndex < 6) {
    return "결승 진출";
  } else if (memberIndex > totalResult.length - 12) {
    return "자코컵 진출";
  } else {
    ("");
  }
}

export default GroupStage;
