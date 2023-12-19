import clientPromise from "@/lib/mongodb";
import Overview from "./components/overview";
import CupSelector from "./components/cup_selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CupInfoType } from "@/lib/typeDef";

export default async function Records() {
  const cupList = await getCupListData();

  return (
    <div className="p-4 flex-1">
      <h1 className="text-4xl font-extrabold">Records</h1>
      <div className="flex gap-3 mb-3 items-center"></div>
      <Tabs defaultValue="overview">
        <TabsList className="mr-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
        </TabsList>
        <CupSelector cupList={cupList} />
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="rounds">Round</TabsContent>
      </Tabs>
    </div>
  );
}

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
