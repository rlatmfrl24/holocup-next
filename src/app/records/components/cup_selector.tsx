"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useCurrentCup } from "../store";
import { useBaseData } from "@/lib/store";

const CupSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentCup = useCurrentCup();
  const cupList = useBaseData((state) => state.cupData).sort(
    (a, b) => b.year - a.year
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-80 justify-between"
        >
          {currentCup.currentCup
            ? cupList.find((cup) => cup.code === currentCup.currentCup?.code)
                ?.name_kr
            : "대회 선택"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Command>
          <CommandInput placeholder="찾으시는 대회명을 입력해주세요" />
          <CommandEmpty>해당하는 대회가 없습니다.</CommandEmpty>
          <CommandGroup>
            {cupList.map((cup) => {
              return (
                <CommandItem
                  key={cup.code}
                  value={cup.name_kr}
                  onSelect={() => {
                    currentCup.setCurrentCup(cup);
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentCup.currentCup?.code === cup.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {cup.name_kr}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CupSelector;
