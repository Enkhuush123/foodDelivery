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
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";

export const Cart = () => {
  const [foodOrders, setFoodOrders] = useState([]);
  const { user } = useUser();
  console.log(user, "user");
  const getData = async () => {
    const data = await fetch(`http://localhost:9000/foodOrder/${user}`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const json = await data.json();
    setFoodOrders(json);
    console.log(json, "gg");
  };
  useEffect(() => {
    getData();
  }, []);
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
          <Tab foods={foodOrders} getFoods={getData} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
