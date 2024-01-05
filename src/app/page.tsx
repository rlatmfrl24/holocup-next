import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="px-4 py-12 grid grid-cols-2 gap-4 container">
      <CardItem
        title="홀로라이브 정월컵 2024"
        description="홀로라이브 정월컵 2024 관련 정보를 다룹니다"
        href="/new_year_cup_2024"
      />
      <CardItem
        title="기록실"
        description="지난 대회의 대회 결과 및 라운드 결과를 조회할 수 있습니다."
        href="/records"
      />
      <CardItem
        title="종합 랭킹"
        description="멤버별 종합 랭킹과 멤버의 역대 참가정보를 조회할 수 있습니다"
        href="/leaderboard"
      />
      <CardItem
        title="관련 정보"
        description="해당 DB 관련 정보 출처 및 라이센스를 확인할 수 있습니다"
        href="/about"
      />
    </div>
  );
}

const CardItem = ({
  title,
  description,
  href,
}: {
  title: string;
  description?: string;
  href: string;
}) => {
  return (
    <Link href={href} className="flex h-full">
      <Card className="flex-1 hover:border-2 hover:border-black overflow-hidden">
        <CardContent className="flex flex-col h-full justify-center items-center font-notoSans gap-4 hover:bg-neutral-100">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{description}</p>
          <ChevronRightCircle className="w-8 h-8 text-gray-400" />
        </CardContent>
      </Card>
    </Link>
  );
};
