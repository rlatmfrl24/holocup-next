import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function sumRacePoints(race_results: number[], ParticipantCount?: number) {
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

  const point_table_2: { [key: number]: number } = {
    1: 13,
    2: 11,
    3: 9,
    4: 8,
    5: 7,
    6: 6,
    7: 5,
    8: 4,
    9: 3,
    10: 2,
    11: 1,
  };

  if (ParticipantCount && ParticipantCount == 11) {
    return race_results?.reduce((acc, cur) => {
      return acc + (point_table_2[cur] ? point_table_2[cur] : 0);
    }, 0);
  } else {
    return race_results?.reduce((acc, cur) => {
      return acc + (point_table[cur] ? point_table[cur] : 0);
    }, 0);
  }
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
