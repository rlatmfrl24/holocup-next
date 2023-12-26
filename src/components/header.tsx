"use client";

import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { CupInfoType, MemberType, RoundType } from "@/lib/typeDef";
import { useBaseData } from "@/lib/store";

export default function Header({
  cupList,
  memberList,
  roundList,
}: {
  cupList: CupInfoType[];
  memberList: MemberType[];
  roundList: RoundType[];
}) {
  const initialize = useBaseData.getState().initialize;
  initialize(cupList, memberList, roundList);

  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <Link href="/">
        <span className="text-2xl font-bold">Hololive MarioKart DB</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/new_year_cup_2024" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                New Year Cup 2024
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/records" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Records
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
