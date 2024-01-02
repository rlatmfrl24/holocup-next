import { CupInfoType } from "@/lib/typeDef";
import { create } from "zustand";

interface SelectorState {
  currentCup: CupInfoType | null;
  currentRound: string | null;
  currentBlock: string | null;
  setCurrentCup: (cup: CupInfoType) => void;
  setCurrentRound: (round: string) => void;
  setCurrentBlock: (block: string) => void;
}

const useCurrentCup = create<SelectorState>()((set) => ({
  currentCup: null,
  currentRound: null,
  currentBlock: null,
  setCurrentCup: (cup) => set({ currentCup: cup }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCurrentBlock: (block) => set({ currentBlock: block }),
}));

export { useCurrentCup };
