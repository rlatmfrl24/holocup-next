import clientPromise from "@/lib/mongodb";
import { CupInfoType } from "@/lib/typeDef";

export async function getCupListData(): Promise<CupInfoType[]> {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const cupInfo = db.collection("cup_info");
  const cupListData = await cupInfo.find({}).toArray();
  const cupList = cupListData.map((cup) => {
    return {
      _id: cup._id,
      code: cup.code as string,
      name_kr: cup.name.kr as string,
      name_en: cup.name.en as string,
    } as CupInfoType;
  });

  return cupList;
}

export async function getOverviewData() {}
