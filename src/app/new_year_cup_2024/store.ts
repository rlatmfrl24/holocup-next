import { PredictionType } from "@/lib/typeDef";
import { create } from "zustand";

interface PredictionState {
  currentComponent: "create" | "inquiry" | "auth";
  setCurrentComponent: (id: "create" | "inquiry" | "auth") => void;
  predictionList: PredictionType[];
  setPreidctionList: (prediction: PredictionType[]) => void;
}

const usePredictionState = create<PredictionState>()((set) => ({
  currentComponent: "auth",
  setCurrentComponent: (id) => set({ currentComponent: id }),
  predictionList: [],
  setPreidctionList: (list) => set({ predictionList: list }),
}));

export { usePredictionState };
