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

export const Category = () => {
  const [addCategory, setAddCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
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
  const handleAddCategory = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9000/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: addCategory }),
    });

    if (response.ok) {
      setAddCategory("");
      getData();
    }
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pt-[84px] pl-5 relative">
      {showAlert && (
        <div className="fixed w-full inset-0 flex justify-center  p-5">
          <div className="w-[368px] h-10 bg-black rounded-lg flex items-center justify-center">
            <p className="text-white">
              New Category is being added to the menu
            </p>
          </div>
        </div>
      )}
      <div className="w-[1950px] shadow-sm flex flex-col p-5 gap-2 rounded-lg ">
        <div>
          <h1 className="font-semibold text-xl">Dishes category</h1>
        </div>
        <div className="flex gap-3 ">
          {category.map((category) => {
            return (
              <CategoryCard key={category._id} name={category.categoryName} />
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
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    placeholder="Type category name..."
                    className="w-[412px] h-[38px] shadow-sm rounded-lg pl-5"
                  ></input>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddCategory} type="submit">
                    Add category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
