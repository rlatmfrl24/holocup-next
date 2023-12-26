import { create } from "zustand";
import { CupInfoType, MemberType, RoundType } from "./typeDef";

interface BaseDataState {
  cupData: CupInfoType[];
  memberData: MemberType[];
  roundData: RoundType[];
  initialize: (
    cupData: CupInfoType[],
    memberData: MemberType[],
    roundData: RoundType[]
  ) => void;
  setCupData: (cupData: CupInfoType[]) => void;
  setMemberData: (memberData: MemberType[]) => void;
  setRoundData: (roundData: RoundType[]) => void;
}

const useBaseData = create<BaseDataState>()((set) => ({
  cupData: [],
  memberData: [],
  roundData: [],
  initialize: (cupData, memberData, roundData) =>
    set({ cupData, memberData, roundData }),
  setCupData: (cupData) => set({ cupData }),
  setMemberData: (memberData) => set({ memberData }),
  setRoundData: (roundData) => set({ roundData }),
}));

export { useBaseData };
