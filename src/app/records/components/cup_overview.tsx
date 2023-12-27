"use client";

import { useBaseData } from "@/lib/store";
import { useCurrentCup } from "../store";
import { convertMemberCodeToName, makeCupOverviewData } from "../utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NextPage } from "next";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function CupOverview() {
  const currentCup = useCurrentCup((state) => state.currentCup);
  const roundData = useBaseData((state) => state.roundData);
  const memberData = useBaseData((state) => state.memberData);

  const cupOverviewData = currentCup
    ? makeCupOverviewData(currentCup, roundData)
    : null;

  return (
    cupOverviewData && (
      <div className="flex flex-col gap-3 py-6">
        <Label className="text-2xl font-semibold ">주요 수상자</Label>
        <div className="grid grid-cols-5 gap-2">
          <MemberFrameCard
            title="우승"
            code={cupOverviewData.champion.member_code ?? ""}
            name_kr={
              memberData.find(
                (member) => member.id === cupOverviewData.champion.member_code
              )?.name_kr ?? ""
            }
            name_en={convertMemberCodeToName(
              cupOverviewData.champion.member_code
            )}
          />
          <MemberFrameCard
            title="준우승"
            code={cupOverviewData.secondWinner.member_code ?? ""}
            name_kr={
              memberData.find(
                (member) =>
                  member.id === cupOverviewData.secondWinner.member_code
              )?.name_kr ?? ""
            }
            name_en={convertMemberCodeToName(
              cupOverviewData.secondWinner.member_code
            )}
          />
          <MemberFrameCard
            title="3위"
            code={
              cupOverviewData.thirdWinner.member_code
                ? cupOverviewData.thirdWinner.member_code
                : ""
            }
            name_kr={
              memberData.find(
                (member) =>
                  member.id === cupOverviewData.thirdWinner.member_code
              )?.name_kr ?? ""
            }
            name_en={
              convertMemberCodeToName(
                cupOverviewData.thirdWinner.member_code
              ) ?? ""
            }
          />
          <MemberFrameCard
            title="자코컵 우승"
            code={
              cupOverviewData.jakocupWinner.member_code
                ? cupOverviewData.jakocupWinner.member_code
                : ""
            }
            name_kr={
              memberData.find(
                (member) =>
                  member.id === cupOverviewData.jakocupWinner.member_code
              )?.name_kr ?? ""
            }
            name_en={
              convertMemberCodeToName(
                cupOverviewData.jakocupWinner.member_code
              ) ?? ""
            }
          />
          <MemberFrameCard
            title="자코컵 최하위"
            code={
              cupOverviewData.jakocupLastOne.member_code
                ? cupOverviewData.jakocupLastOne.member_code
                : ""
            }
            name_kr={
              memberData.find(
                (member) =>
                  member.id === cupOverviewData.jakocupLastOne.member_code
              )?.name_kr ?? ""
            }
            name_en={
              convertMemberCodeToName(
                cupOverviewData.jakocupLastOne.member_code
              ) ?? ""
            }
          />
        </div>
        <Label className="text-2xl font-semibold mt-3">
          참가 엔트리 및 결과
        </Label>
        <div className="flex gap-3">
          {Object.entries(cupOverviewData.blockGroups).map(([key, value]) => {
            return (
              <Card key={key} className="flex-1">
                <CardHeader>
                  <CardTitle>
                    {convertMemberCodeToName(key.toLocaleLowerCase())}
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {value.map((member, index) => {
                      return (
                        <div
                          key={member.member_code}
                          className="flex items-center gap-2"
                        >
                          <Label className="font-semibold">{index + 1}위</Label>
                          <Avatar>
                            <AvatarImage
                              src={`/members/` + member.member_code + `.png`}
                              alt={member.member_code}
                            />
                          </Avatar>
                          <p className="flex flex-col">
                            <Label className="ml-2">
                              {memberData.find(
                                (memberInfo) =>
                                  memberInfo.id === member.member_code
                              )?.name_kr ?? ""}
                            </Label>
                            <Label className="ml-2">
                              {convertMemberCodeToName(member.member_code)}
                            </Label>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    )
  );
}

const MemberFrameCard: NextPage<{
  code: string;
  name_kr: string;
  name_en: string;
  title?: string;
}> = ({ code, name_kr, name_en, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title ? title : name_kr}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center">
        <Image
          src={`/members/` + code + `.png`}
          alt={code}
          width={200}
          height={200}
          layout="cover"
        />
        <div className="flex flex-col items-center">
          <Label className="font-semibold text-lg">{name_kr}</Label>
          <Label>{name_en}</Label>
        </div>
      </CardContent>
    </Card>
  );
};
