"use client";

import { getNameFromCode } from "@/app/records/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

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
  const [blockList, setBlockList] = useState<string[]>([]);
  const [roundSelection, setRoundSelection] = useState<Record<string, string>>({
    round: "",
    block: "",
  });

  useEffect(() => {
    console.log(blockList);
  }, [blockList]);

  return (
    <div>
      <div className="flex gap-3">
        <Select
          onValueChange={(value) => {
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
          <Select>
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
    </div>
  );
};

export default ResultPage;
