"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Plus } from "../_icons/plus";
import { CategoryCard } from "../_components/categoryCard";
import { FoodCards } from "../_components/foodCard";

export const Category = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getData = async () => {
    const data = await fetch("http://localhost:9000/category", options);
    const jsonData = await data.json();
    setCategory(jsonData);
    console.log(jsonData, "here");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="pt-[84px] pl-5">
      <div className="w-[1950px] shadow-sm flex flex-col p-5 gap-2 rounded-lg ">
        <div>
          <h1 className="font-semibold text-xl">Dishes category</h1>
        </div>
        <div className="flex gap-3">
          {category.map((category) => {
            return (
              <CategoryCard key={category.id} name={category.categoryName} />
            );
          })}

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
                  <DialogTitle>Add new category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <p>Category name</p>
                  <input
                    placeholder="Type category name..."
                    className="w-[412px] h-[38px] shadow-sm rounded-lg pl-5"
                  ></input>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add category</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
