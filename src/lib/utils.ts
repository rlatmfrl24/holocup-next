import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import clientPromise from "./mongodb";
import { CupInfoType, MemberType, RoundType } from "./typeDef";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
