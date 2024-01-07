"use client";

import RaceResults from "@/components/race_results";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBaseData } from "@/lib/store";
import { RoundType } from "@/lib/typeDef";
import { convertMemberCodeToName, sumRacePoints } from "@/lib/utils";

const Preliminary = ({ roundData }: { roundData: RoundType[] }) => {
  const memberData = useBaseData((state) => state.memberData);

  return (
    <div className="my-4">
      <Table className="font-notoSans mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>멤버</TableHead>
            <TableHead>레이스 결과</TableHead>
            <TableHead>점수</TableHead>
            <TableHead>비고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roundData
            .sort((a, b) => {
              return (
                sumRacePoints(b.race_results) - sumRacePoints(a.race_results)
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
                  <TableCell className="flex gap-2">
                    {round.race_results !== undefined && (
                      <RaceResults race_results={round.race_results} />
                    )}
                  </TableCell>
                  <TableCell>
                    {sumRacePoints(round.race_results, roundData.length)}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {
                      {
                        0: "결승 진출",
                      }[index]
                    }
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Preliminary;
