"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NextPage } from "next";
import Image from "next/image";

const Overview = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-5 gap-2">
        <MemberFrameCard
          title="우승"
          code="tokino_sora"
          name_kr="토키노 소라"
          name_en="Tokino Sora"
        />
        <MemberFrameCard
          title="준우승"
          code="tokino_sora"
          name_kr="토키노 소라"
          name_en="Tokino Sora"
        />
        <MemberFrameCard
          title="3위"
          code="tokino_sora"
          name_kr="토키노 소라"
          name_en="Tokino Sora"
        />
        <MemberFrameCard
          title="자코컵 우승"
          code="tokino_sora"
          name_kr="토키노 소라"
          name_en="Tokino Sora"
        />
        <MemberFrameCard
          title="자코컵 최하위"
          code="tokino_sora"
          name_kr="토키노 소라"
          name_en="Tokino Sora"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>참가자 엔트리</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-xl font-semibold">Block A</Label>
          <div className="flex gap-1">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => {
              return (
                <Avatar key={i}>
                  <AvatarImage
                    src={`/members/tokino_sora.png`}
                    alt="@tokino_sora"
                  />
                </Avatar>
              );
            })}
          </div>
          <Label className="text-xl font-semibold">Block B</Label>
          <div className="flex gap-2">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => {
              return (
                <Avatar key={i}>
                  <AvatarImage
                    src={`/members/tokino_sora.png`}
                    alt="@tokino_sora"
                  />
                </Avatar>
              );
            })}
          </div>

          <Label className="text-xl font-semibold">Block C</Label>
          <div className="flex gap-3">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => {
              return (
                <Avatar key={i}>
                  <AvatarImage
                    src={`/members/tokino_sora.png`}
                    alt="@tokino_sora"
                  />
                </Avatar>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;

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
