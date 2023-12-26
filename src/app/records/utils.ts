import clientPromise from "@/lib/mongodb";
import { CupInfoType } from "@/lib/typeDef";

export async function getCupListData(): Promise<CupInfoType[]> {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const cupInfo = db.collection("cup_info");
  const cupListData = await cupInfo.find({}).toArray();
  const cupList = cupListData.map((cup) => {
    return {
      code: cup.code as string,
      type: cup.type as string,
      year: cup.year as number,
      name_kr: cup.name.kr as string,
      name_en: cup.name.en as string,
    } as CupInfoType;
  });

  return cupList;
}

export async function getOverviewData(cupType: string, year: number) {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const collection = db.collection("rounds");
  const roundsData = await collection
    .find({ cup_code: cupType, year: year })
    .toArray();
  const rounds = roundsData.map((round) => {
    return {
      cup_code: round.cup_code,
      year: round.year,
      round_code: round.round_code,
      block_code: round.block_code,
      member_code: round.member_code,
      race_results: round.race_results,
    };
  });
  return rounds;
}
