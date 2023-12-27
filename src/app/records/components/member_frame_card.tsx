import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NextPage } from "next";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const MemberFrameCard: NextPage<{
  code: string;
  name_kr: string;
  name_en: string;
  title?: string;
}> = ({ code, name_kr, name_en, title }) => {
  return (
    <Card className="flex-1">
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

export default MemberFrameCard;
