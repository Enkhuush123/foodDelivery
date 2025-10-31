"use client";

import { useState } from "react";
import { FoodContain } from "../_components/foodContainer";
import { Plus } from "../_icons/plus";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImgIcon } from "../_icons/imgIcon";
export const Product = () => {
  const [addFood, setAddFood] = useState(false);
  return (
    <div className="pl-5">
      <div className="w-[1950px] shadow-sm rounded-lg gap-2 ">
        <div className="p-5">
          <p className="font-semibold text-xl">Salads (3)</p>
        </div>
        <div className=" flex flex-row items-center">
          <div className="w-[270.75px] h-[241px] rounded-lg border border-dashed border-red-600 flex flex-col justify-center items-center gap-2 p-5">
            {/* <button
              onClick={() => setAddFood(true)}
              className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center "
            >
              <Plus />
            </button> */}
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center "
                  >
                    <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[460px]">
                  <DialogHeader>
                    <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-between">
                    <div>
                      <p>Food name</p>
                      <input
                        className="w-[194px] h-[38px] border border-gray-400 rounded-lg pl-3"
                        placeholder="Type food name...
                  "
                      ></input>
                    </div>
                    <div>
                      <p>Food price</p>
                      <input
                        className="w-[194px] h-[38px] border border-gray-400 rounded-lg pl-3"
                        placeholder="Enter price..."
                      ></input>
                    </div>
                  </div>
                  <div>
                    <p>Ingredients</p>
                    <input
                      placeholder="List ingredients..."
                      className="w-[412px] h-[90px]  border border-gray-400 rounded-lg "
                    ></input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Food image</p>
                    <div className="w-[412px] h-[138px] border border-dashed bg-blue-50 flex justify-center items-center flex-col">
                      <button className="w-8 h-8 bg-white justify-center items-center rounded-full flex">
                        <ImgIcon />
                      </button>
                      <p>Choose a file or drag & drop it here</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add dish</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <div>
              <p className="font-normal text-sm">Add new Dish to Appetizers </p>
            </div>
          </div>
          <FoodContain />
        </div>
      </div>
      {/* {addFood && (
        <div className="fixed flex inset-0 justify-center items-center  ">
          <div className="w-[460px] shadow-sm  ">
            <div className="flex justify-between p-5">
              <p>Add new Dish to Appetizers</p>
              <button className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                <EscIcon />
              </button>
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <p>Food name</p>
                <input
                  className="w-[194px] h-[38px] border border-gray-500 rounded-lg pl-3"
                  placeholder="Type food name...
                  "
                ></input>
              </div>
              <div>
                <p>Food price</p>
                <input
                  className="w-[194px] h-[38px] border border-gray-500 rounded-lg pl-3"
                  placeholder="Enter price..."
                ></input>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
