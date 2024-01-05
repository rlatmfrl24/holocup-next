import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RoundType } from "./typeDef";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function sumRacePoints(race_results: number[]) {
  const point_table: { [key: number]: number } = {
    1: 15,
    2: 12,
    3: 10,
    4: 9,
    5: 8,
    6: 7,
    7: 6,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1,
  };

  return race_results.reduce((acc, cur) => {
    return acc + (point_table[cur] ? point_table[cur] : 0);
  }, 0);
}

function convertMemberCodeToName(memberCode: string) {
  return (
    memberCode
      .replaceAll("_", " ")
      // capitalize first letter of each word
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
  );
}

export { cn, sumRacePoints, convertMemberCodeToName };
