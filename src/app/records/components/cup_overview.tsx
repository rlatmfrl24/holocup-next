"use client";

import { useBaseData } from "@/lib/store";
import { useSelectorState } from "../store";
import { makeCupOverviewData } from "../utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import MemberFrameCard from "./member_frame_card";
import { convertMemberCodeToName } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CupOverview() {
  const currentCup = useSelectorState((state) => state.currentCup);
  const roundData = useBaseData((state) => state.roundData);
  const memberData = useBaseData((state) => state.memberData);

  const router = useRouter();

  const cupOverviewData = currentCup
    ? makeCupOverviewData(currentCup, roundData)
    : null;

  return (
    cupOverviewData && (
      <div className="flex flex-col gap-3 py-6 font-notoSans">
        <Label className="text-2xl font-semibold ">주요 수상자</Label>
        <div className="grid grid-cols-5 gap-2">
          {cupOverviewData.champion ? (
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
          ) : null}
          {cupOverviewData.secondWinner ? (
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
          ) : null}

          {cupOverviewData.thirdWinner ? (
            <MemberFrameCard
              title="3위"
              code={cupOverviewData.thirdWinner.member_code ?? ""}
              name_kr={
                memberData.find(
                  (member) =>
                    member.id === cupOverviewData.thirdWinner.member_code
                )?.name_kr ?? ""
              }
              name_en={convertMemberCodeToName(
                cupOverviewData.thirdWinner.member_code
              )}
            />
          ) : null}

          {cupOverviewData.jakocupWinner ? (
            <MemberFrameCard
              title="자코컵 우승"
              code={cupOverviewData.jakocupWinner.member_code ?? ""}
              name_kr={
                memberData.find(
                  (member) =>
                    member.id === cupOverviewData.jakocupWinner.member_code
                )?.name_kr ?? ""
              }
              name_en={convertMemberCodeToName(
                cupOverviewData.jakocupWinner.member_code
              )}
            />
          ) : null}

          {cupOverviewData.jakocupLastOne ? (
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
          ) : null}
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
                    {value
                      .sort((a, b) => {
                        return b.point - a.point;
                      })
                      .map((member, index) => {
                        return (
                          <div
                            key={member.member_code}
                            className="flex items-center gap-2 hover:bg-zinc-100 p-2 rounded-md cursor-pointer"
                            onClick={() => {
                              router.push("/member/" + member.member_code);
                            }}
                          >
                            <span className="font-semibold w-12 text-center">
                              {index + 1}위
                            </span>
                            <Avatar>
                              <AvatarImage
                                src={`/members/` + member.member_code + `.png`}
                                alt={member.member_code}
                              />
                            </Avatar>
                            <p className="flex flex-col">
                              <span className="ml-2 font-bold text-base">
                                {memberData.find(
                                  (memberInfo) =>
                                    memberInfo.id === member.member_code
                                )?.name_kr ?? ""}
                              </span>
                              <span className="ml-2 text-xs font-normal">
                                {convertMemberCodeToName(member.member_code)}
                              </span>
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
