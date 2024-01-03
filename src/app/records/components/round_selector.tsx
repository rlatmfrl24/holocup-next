"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectorState } from "../store";
import { useBaseData } from "@/lib/store";
import { useEffect } from "react";
import { getNameFromCode } from "../utils";

const RoundSelector = () => {
  const currentCup = useSelectorState((state) => state.currentCup);
  const currentRound = useSelectorState((state) => state.currentRound);
  const setCurrentRound = useSelectorState((state) => state.setCurrentRound);
  const currentBlock = useSelectorState((state) => state.currentBlock);
  const setCurrentBlock = useSelectorState((state) => state.setCurrentBlock);

  const roundList = useBaseData((state) => state.roundData)
    .filter(
      (cup) =>
        cup.cup_code === currentCup?.type && cup.year === currentCup?.year
    )
    .reduce((acc, cur) => {
      if (!acc.includes(cur.round_code)) {
        acc.push(cur.round_code);
      }
      return acc;
    }, [] as string[]);

  const blockList = useBaseData((state) => state.roundData)
    .filter(
      (cup) =>
        cup.cup_code === currentCup?.type &&
        cup.year === currentCup?.year &&
        cup.round_code === currentRound
    )
    .reduce((acc, cur) => {
      if (!acc.includes(cur.block_code)) {
        acc.push(cur.block_code);
      }
      return acc;
    }, [] as string[]);

  useEffect(() => {
    if (!currentRound || !roundList.includes(currentRound)) {
      setCurrentRound(roundList[0]);
    }
  }, [currentCup, currentRound, roundList, setCurrentRound]);

  useEffect(() => {
    if (!currentBlock || !blockList.includes(currentBlock)) {
      setCurrentBlock(blockList[0]);
    }
  }, [currentCup, currentRound, currentBlock, blockList, setCurrentBlock]);

  return (
    <>
      {roundList.length > 1 && (
        <Select
          onValueChange={(value) => setCurrentRound(value)}
          value={currentRound ?? ""}
        >
          <SelectTrigger className="w-32 ml-2 font-notoSans">
            <SelectValue placeholder="Select Round.." />
          </SelectTrigger>
          <SelectContent className="font-notoSans">
            {roundList.map((round) => {
              return (
                <SelectItem key={round} value={round}>
                  {getNameFromCode(round)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
      {blockList.length > 1 && (
        <Select
          onValueChange={(value) => setCurrentBlock(value)}
          value={currentBlock ?? ""}
        >
          <SelectTrigger className="w-40 ml-2 font-notoSans">
            <SelectValue placeholder="Select Round.." />
          </SelectTrigger>
          <SelectContent className="font-notoSans">
            {blockList.map((block) => {
              return (
                <SelectItem key={block} value={block}>
                  {getNameFromCode(block)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default RoundSelector;
