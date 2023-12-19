import { MongoClient, ObjectId } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export type CupInfoType = {
  _id: ObjectId;
  code: string;
  name_kr: string;
  name_en: string;
};
