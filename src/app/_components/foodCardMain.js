"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import { NegativeIcon } from "../_icons/negativeIcon";
import { PlusBlack } from "../_icons/plusBlackIcon";
import { PlusIconRed } from "../_icons/plusIconRed";

export const FoodCardMain = ({ ingredients, name, price, img }) => {
  return (
    <div className="w-[397px] h-[342px] bg-white p-5 rounded-lg flex flex-col gap-5  items-center ">
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-[365px] h-[210px] justify-center relative flex  ">
            <Image
              className="w-[365px] h-[210px] object-cover rounded-lg absolute  "
              height={"100"}
              width={"100"}
              src={img || "/food.png"}
              alt={"food image"}
            />
            <div className="flex items-end justify-end w-full p-5 ">
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-11 h-11 bg-white flex justify-center items-center z-50  inset-0 rounded-full  "
              >
                <PlusIconRed />
              </button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          className="w-[826px] flex  
        "
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className=" flex w-[826px]  p-5 justify-between ">
            <div className="w-[377px] h-[364px] relative">
              <Image
                className="w-full h-[364px] object-cover rounded-lg "
                src={img || "/food.png"}
                height={100}
                width={100}
                alt={"food image"}
              />
            </div>
            <div className="flex flex-col gap-5 w-[377px] justify-between  ">
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-red-500 text-3xl">{name}</p>
                <p>{ingredients}</p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <div>
                    <p>Total price</p>
                    <p className="font-semibold text-2xl">{price}₮</p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <button className="w-11 h-11 bg-white border rounded-full flex items-center justify-center">
                      <NegativeIcon />
                    </button>
                    <p>1</p>
                    <button className="w-11 h-11 bg-white border rounded-full flex justify-center items-center">
                      {" "}
                      <PlusBlack />
                    </button>
                  </div>
                </div>
                <Button className="w-[377px] h-11 rounded-lg" type="submit">
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex gap-2 flex-col">
        <div className="flex  justify-between">
          <p className="text-red-500">{name}</p>
          <p className="font-semibold text-lg">{price}₮</p>
        </div>
        <div>
          <p className="font-normal text-xs h-8 overflow-auto">{ingredients}</p>
        </div>
      </div>
    </div>
  );
};
