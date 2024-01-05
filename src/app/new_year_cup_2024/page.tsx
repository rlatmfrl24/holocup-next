import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Entry from "./entry";
import Prediction from "./prediction/prediction";
import clientPromise from "@/lib/mongodb";
import { PredictionType } from "@/lib/typeDef";
import Preliminary from "./result/preliminary";
import GroupStage from "./result/group_stage";
import FinalRound from "./result/final";
import ResultPage from "./result/result";

async function getPredictionDataFromDB() {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const predictionData = db.collection("prediction");
  const predictionDataList = await predictionData.find({}).toArray();

  const predictionList: PredictionType[] = predictionDataList.map(
    (prediction) => {
      return {
        userId: prediction.userId as string,
        userPwd: prediction.userPwd as string,
        winner: prediction.winner as string,
        runnerUp: prediction.runnerUp as string,
        third: prediction.third as string,
        jakoWinner: prediction.jakoWinner as string,
        jako: prediction.jako as string,
        championship: prediction.championship as string[],
        jakocup: prediction.jakocup as string[],
        createdAt: prediction.createdAt as Date,
      };
    }
  );

  return predictionList;
}

export default async function NewYearCup2024() {
  const predictionData = await getPredictionDataFromDB();

  return (
    <div className="p-4 flex-1 container">
      <h1 className="text-4xl font-extrabold">New Year Cup 2024</h1>
      <Tabs defaultValue="entry" className="mt-4">
        <TabsList className="font-notoSans">
          <TabsTrigger value="entry">참가 멤버</TabsTrigger>
          <TabsTrigger value="result">대회 진행 결과</TabsTrigger>
          {/* <TabsTrigger value="prediction">승부 예측</TabsTrigger> */}
        </TabsList>
        <TabsContent value="entry">
          <Entry />
        </TabsContent>
        <TabsContent value="result">
          <ResultPage />
        </TabsContent>
        <TabsContent value="prediction">
          <Prediction predictionData={predictionData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
