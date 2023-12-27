import "./globals.css";
import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import clientPromise from "@/lib/mongodb";
import { CupInfoType, MemberType, RoundType } from "@/lib/typeDef";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hololive MarioKart DB",
  description: "Hololive MarioKart Database",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cupList, memberList, roundList } = await getBaseDataFromDB();

  return (
    <html lang="en">
      <body className={inter.className + ` h-screen w-full flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header
            cupList={cupList}
            memberList={memberList}
            roundList={roundList}
          />
          <Separator />
          <div className="flex flex-auto overflow-auto h-0">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

async function getBaseDataFromDB() {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const cupData = db.collection("cup_info");
  const memberData = db.collection("members");
  const roundData = db.collection("round_data");
  const cupListData = await cupData.find({}).toArray();
  const memberListData = await memberData.find({}).toArray();
  const roundListData = await roundData.find({}).toArray();

  const cupList: CupInfoType[] = cupListData.map((cup) => {
    return {
      code: cup.code as string,
      type: cup.type as string,
      year: cup.year as number,
      name_kr: cup.name.kr as string,
      name_en: cup.name.en as string,
    };
  });

  const memberList: MemberType[] = memberListData.map((member) => {
    return {
      id: member.id as string,
      name_kr: member.name_kr as string,
      belong: member.belong as string,
      belong_name: member.belong_name as string,
      color_primary: member.color_primary as string,
      color_secondary: member.color_secondary as string,
      oshi_mark: member.oshi_mark as string,
    };
  });

  const roundList: RoundType[] = roundListData.map((round) => {
    return {
      cup_code: round.cup_code as string,
      year: round.year as number,
      round_code: round.round_code as string,
      block_code: round.block_code as string,
      member_code: round.member_code as string,
      race_results: round.race_results as number[],
    };
  });

  return {
    cupList,
    memberList,
    roundList,
  };
}
