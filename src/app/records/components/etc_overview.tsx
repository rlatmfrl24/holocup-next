"use client";

import { useBaseData } from "@/lib/store";
import { useSelectorState } from "../store";
import { Label } from "@radix-ui/react-label";
import { makeETCOverviewData } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { convertMemberCodeToName } from "@/lib/utils";

export default function EtcOverview() {
  const currentCup = useSelectorState((state) => state.currentCup);
  const roundData = useBaseData((state) => state.roundData);
  const memberData = useBaseData((state) => state.memberData);

  const overviewData = currentCup && makeETCOverviewData(currentCup, roundData);

  return (
    <div className="flex flex-col gap-3 py-6">
      <Label className="text-2xl font-semibold ">주요 성적</Label>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>단일 최고 득점 순위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {overviewData?.highestScore.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <div className="w-8">
                    {
                      //caculate rank by point
                      overviewData?.highestScore
                        .map((data) => data.point)
                        .sort((a, b) => b - a)
                        .indexOf(data.point) + 1
                    }
                    위
                  </div>
                  <Avatar>
                    <AvatarImage
                      src={`/members/` + data.member_code + `.png`}
                    />
                  </Avatar>
                  <p className="flex flex-1 flex-col">
                    <Label className="ml-2">
                      {memberData.find(
                        (memberInfo) => memberInfo.id === data.member_code
                      )?.name_kr ?? ""}
                    </Label>
                    <Label className="ml-2">
                      {convertMemberCodeToName(data.member_code)}
                    </Label>
                  </p>
                  <div>{data.point}점</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>총 득점 순위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {overviewData?.totalPointArray.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <div className="w-8">
                    {
                      //caculate rank by point
                      overviewData?.totalPointArray
                        .map((data) => data.point)
                        .sort((a, b) => b - a)
                        .indexOf(data.point) + 1
                    }
                    위
                  </div>
                  <Avatar>
                    <AvatarImage
                      src={`/members/` + data.member_code + `.png`}
                    />
                  </Avatar>
                  <p className="flex flex-1 flex-col">
                    <Label className="ml-2">
                      {memberData.find(
                        (memberInfo) => memberInfo.id === data.member_code
                      )?.name_kr ?? ""}
                    </Label>
                    <Label className="ml-2">
                      {convertMemberCodeToName(data.member_code)}
                    </Label>
                  </p>
                  <div>{data.point}점</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>상위 진입 순위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {overviewData?.highRankCountArray.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <div className="w-8">
                    {
                      //caculate rank by point
                      overviewData?.highRankCountArray
                        .map((data) => data.count)
                        .sort((a, b) => b - a)
                        .indexOf(data.count) + 1
                    }
                    위
                  </div>
                  <Avatar>
                    <AvatarImage
                      src={`/members/` + data.member_code + `.png`}
                    />
                  </Avatar>
                  <p className="flex flex-1 flex-col">
                    <Label className="ml-2">
                      {memberData.find(
                        (memberInfo) => memberInfo.id === data.member_code
                      )?.name_kr ?? ""}
                    </Label>
                    <Label className="ml-2">
                      {convertMemberCodeToName(data.member_code)}
                    </Label>
                  </p>{" "}
                  <div>{data.count}회</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>하위 진입 순위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {overviewData?.lowestRankCountArray.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <div className="w-8">
                    {
                      //caculate rank by point
                      overviewData?.lowestRankCountArray
                        .map((data) => data.count)
                        .sort((a, b) => b - a)
                        .indexOf(data.count) + 1
                    }
                    위
                  </div>
                  <Avatar>
                    <AvatarImage
                      src={`/members/` + data.member_code + `.png`}
                    />
                  </Avatar>
                  <p className="flex flex-1 flex-col">
                    <Label className="ml-2">
                      {memberData.find(
                        (memberInfo) => memberInfo.id === data.member_code
                      )?.name_kr ?? ""}
                    </Label>
                    <Label className="ml-2">
                      {convertMemberCodeToName(data.member_code)}
                    </Label>
                  </p>{" "}
                  <div>{data.count}회</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
