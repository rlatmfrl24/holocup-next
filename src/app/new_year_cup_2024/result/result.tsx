"use client";

import { getNameFromCode } from "@/app/records/utils";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBaseData } from "@/lib/store";
import { RoundType } from "@/lib/typeDef";
import { useEffect, useState } from "react";
import Preliminary from "./preliminary";
import GroupStage from "./group_stage";

const RoundTree = {
  1: {
    name: "예선",
    code: "TRYOUT",
  },
  2: {
    name: "본선",
    code: "GROUP_STAGE",
  },
  3: {
    name: "자코컵",
    code: "JAKOCUP",
  },
  4: {
    name: "결승",
    code: "CHAMPIONSHIP",
  },
};

const ResultPage = () => {
  const roundData = useBaseData((state) => state.roundData);
  const [blockList, setBlockList] = useState<string[]>([]);
  const [roundSelection, setRoundSelection] = useState<Record<string, string>>({
    round: "",
    block: "",
  });

  const [currentRoundData, setCurrentRoundData] = useState<RoundType[]>([]);

  useEffect(() => {
    const currentRoundData = roundData
      .filter(
        (round) => round.year === 2024 && round.cup_code === "NEWYEAR_CUP"
      )
      .filter(
        (round) =>
          round.round_code === roundSelection.round &&
          round.block_code === roundSelection.block
      );

    setCurrentRoundData(currentRoundData);

    console.log(currentRoundData);
  }, [roundData, roundSelection.block, roundSelection.round]);

  return (
    <div>
      <div className="flex gap-3">
        <Select
          onValueChange={(value) => {
            setRoundSelection({
              round: value,
              block: "",
            });
            if (value === "TRYOUT") {
              setBlockList(["BLOCK_A", "BLOCK_B", "BLOCK_C"]);
            } else if (value === "GROUP_STAGE") {
              setBlockList(["BLOCK_D", "BLOCK_E", "BLOCK_F"]);
            } else {
              setBlockList([]);
            }
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="라운드를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(RoundTree).map(([key, value]) => {
              return (
                <SelectItem key={key} value={value.code}>
                  {value.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {blockList.length > 0 && (
          <Select
            onValueChange={(value) => {
              setRoundSelection({
                ...roundSelection,
                block: value,
              });
            }}
            value={
              blockList.includes(roundSelection.block)
                ? roundSelection.block
                : ""
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="블록을 선택해주세요" />
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
      </div>
      {
        {
          TRYOUT: <Preliminary roundData={currentRoundData} />,
          GROUP_STAGE: <GroupStage memberRoundData={currentRoundData} />,
          JAKOCUP: <div>자코컵</div>,
          CHAMPIONSHIP: <div>결승</div>,
        }[roundSelection.round]
      }
    </div>
  );
};

export default ResultPage;
