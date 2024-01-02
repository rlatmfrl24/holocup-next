"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentCup } from "../store";
import { useBaseData } from "@/lib/store";
import { useEffect } from "react";

const RoundSelector = () => {
  const currentCup = useCurrentCup((state) => state.currentCup);
  const currentRound = useCurrentCup((state) => state.currentRound);
  const setCurrentRound = useCurrentCup((state) => state.setCurrentRound);
  const currentBlock = useCurrentCup((state) => state.currentBlock);
  const setCurrentBlock = useCurrentCup((state) => state.setCurrentBlock);

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

  function getNameFromCode(code: string) {
    switch (code) {
      case "TRYOUT":
        return "예선";
      case "CHAMPIONSHIP":
        return "본선";
      case "JAKOCUP":
        return "자코컵";
      default:
        if (code.startsWith("BLOCK")) {
          return "블록 " + code.slice(6);
        }

        return "";
    }
  }

  return (
    <>
      {roundList.length > 1 && (
        <Select
          onValueChange={(value) => setCurrentRound(value)}
          value={currentRound ?? ""}
        >
          <SelectTrigger className="w-32 ml-2">
            <SelectValue placeholder="Select Round.." />
          </SelectTrigger>
          <SelectContent>
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
      {currentRound === "TRYOUT" && (
        <Select
          onValueChange={(value) => setCurrentBlock(value)}
          value={currentBlock ?? ""}
        >
          <SelectTrigger className="w-32 ml-2">
            <SelectValue placeholder="Select Round.." />
          </SelectTrigger>
          <SelectContent>
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
