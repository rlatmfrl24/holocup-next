import { CupInfoType } from "@/lib/typeDef";
import { create } from "zustand";

interface SelectorState {
  currentCup: CupInfoType | null;
  currentRound: string | null;
  currentBlock: string | null;
  emphasizedMemberCode: string;
  setCurrentCup: (cup: CupInfoType) => void;
  setCurrentRound: (round: string) => void;
  setCurrentBlock: (block: string) => void;
  setEmphasizedMemberCode: (code: string) => void;
  getSelectorData: () => {
    currentCup: CupInfoType | null;
    currentRound: string | null;
    currentBlock: string | null;
  };
}

const useSelectorState = create<SelectorState>()((set) => ({
  currentCup: null,
  currentRound: null,
  currentBlock: null,
  emphasizedMemberCode: "",
  setCurrentCup: (cup) => set({ currentCup: cup }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCurrentBlock: (block) => set({ currentBlock: block }),
  setEmphasizedMemberCode: (code) => set({ emphasizedMemberCode: code }),
  getSelectorData() {
    return {
      currentCup: this.currentCup,
      currentRound: this.currentRound,
      currentBlock: this.currentBlock,
    };
  },
}));

export { useSelectorState };
