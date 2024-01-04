import { PredictionType } from "@/lib/typeDef";
import { create } from "zustand";

interface PredictionState {
  currentComponent: "create" | "inquiry" | "auth";
  setCurrentComponent: (id: "create" | "inquiry" | "auth") => void;
  predictionList: PredictionType[];
  setPreidctionList: (prediction: PredictionType[]) => void;
  checkPredictionExist: (userId: string) => boolean;
  getPrediction(userId: string, userPwd: string): PredictionType | undefined;
}

const usePredictionState = create<PredictionState>()((set) => ({
  currentComponent: "auth",
  setCurrentComponent: (id) => set({ currentComponent: id }),
  predictionList: [],
  setPreidctionList: (list) => set({ predictionList: list }),
  checkPredictionExist(userId) {
    return this.predictionList.some((p) => p.userId === userId);
  },
  getPrediction(userId, userPwd) {
    return this.predictionList.find(
      (p) => p.userId === userId && p.userPwd === userPwd
    );
  },
}));

export { usePredictionState };
