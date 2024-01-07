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

function getTryoutScore(roundData: RoundType[], memberCode: string) {
  const tryDataRounds = roundData.filter((round) => {
    return (
      round.round_code === "TRYOUT" &&
      round.year === 2024 &&
      round.cup_code === "NEWYEAR_CUP"
    );
  });

  const memberTryoutRound = tryDataRounds.find((round) => {
    return round.member_code === memberCode;
  });

  return sumRacePoints(memberTryoutRound!.race_results, tryDataRounds.length);
}

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
            <TableHead>총점</TableHead>
            <TableHead>결과</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberRoundData
            .sort((a, b) => {
              return (
                getTryoutScore(roundData, b.member_code) -
                getTryoutScore(roundData, a.member_code)
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
                  <TableCell>{sumRacePoints(round.race_results)}</TableCell>
                  <TableCell className="font-semibold">
                    {round.race_results !== undefined &&
                      {
                        0: "결승 진출",
                      }[index]}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default GroupStage;
