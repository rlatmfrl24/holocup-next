import { CupInfoType } from "@/lib/typeDef";
import { create } from "zustand";

interface CurrentCupState {
  currentCup: CupInfoType | null;
  setCurrentCup: (cup: CupInfoType) => void;
}

const useCurrentCup = create<CurrentCupState>()((set) => ({
  currentCup: null,
  setCurrentCup: (cup) => set({ currentCup: cup }),
}));

export { useCurrentCup };
