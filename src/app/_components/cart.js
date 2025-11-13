"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShopIcon } from "../_icons/shopIcon";
import { Tab, Tabs } from "./tabs";
import { ShopIconWhite } from "../_icons/shopIconWhite";
import { useCart } from "@/context/cartContext";

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white flex items-center w-9 h-9 justify-center rounded-full cursor-pointer ">
          <ShopIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className={`bg-neutral-700 p-3`}>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-5 text-white">
            <ShopIconWhite /> Order Detail
          </SheetTitle>
          <SheetDescription
            className={`flex justify-center p-3`}
          ></SheetDescription>
          <Tab />
        </SheetHeader>

        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
