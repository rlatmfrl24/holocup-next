import { MongoClient, ObjectId, Timestamp } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export type CupInfoType = {
  code: string;
  type: string;
  year: number;
  name_kr: string;
  name_en: string;
};

export type MemberType = {
  id: string;
  name_kr: string;
  belong: string;
  belong_name: string;
  color_primary: string;
  color_secondary: string;
  oshi_mark: string;
};

export type RoundType = {
  cup_code: string;
  year: number;
  round_code: string;
  block_code: string;
  member_code: string;
  race_results: number[];
};

export type PredictionType = {
  userId: string;
  userPwd: string;
  winner: string;
  runnerUp: string;
  third: string;
  jakoWinner: string;
  jako: string;
  championship: string[];
  jakocup: string[];
  createdAt: Date;
};
