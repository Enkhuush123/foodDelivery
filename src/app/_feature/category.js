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
import { Product } from "./product";
import { useUser } from "@/context/userContext";

export const Category = () => {
  const [addCategory, setAddCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const { user, logout } = useUser();
  const [profile, setProfile] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const getfoods = async () => {
    const data = await fetch(`http://localhost:9000/foods`, options);
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "ehehe");
  };
  const getData = async () => {
    const data = await fetch("http://localhost:9000/category", options);
    const jsonData = await data.json();
    setCategory(jsonData);
    console.log(jsonData, "herehhhaa");
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
    setDialogOpen(false);

    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    getData();
    getfoods();
  }, []);

  return (
    <div className="w-full max-w-[1200px]  shadow-sm flex flex-col p-5 gap-2 rounded-lg border-none ">
      <div className="flex flex-col gap-5 ">
        {showAlert && (
          <div className="fixed w-full inset-0 flex justify-center  p-5">
            <div className="w-[368px] h-10 bg-black rounded-lg flex items-center justify-center">
              <p className="text-white">
                New Category is being added to the menu
              </p>
            </div>
          </div>
        )}
        <div>
          <button
            onClick={() => setProfile(!profile)}
            className="w-full flex pt-6   justify-end"
          >
            <img
              src="/enhush.jpg"
              alt="enhush"
              className="w-9 h-9 object-cover rounded-full"
            />
          </button>
          {profile && (
            <div className="w-[188px] h-[104px] bg-white rounded-md absolute right-5 flex  flex-col  gap-5 items-center justify-center  ">
              {user.email}
              <button
                onClick={logout}
                className="w-20 h-9 p-1 bg-neutral-200 rounded-full flex justify-center items-center"
              >
                <p className="text-red-500"> Log out</p>
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-w-[1200px] shadow-sm flex flex-col p-5 gap-2 rounded-lg bg-white ">
          <div>
            <h1 className="font-semibold text-xl">Dishes category</h1>
          </div>
          <div className="flex gap-3 ">
            {foods && (
              <button className="w-auto h-9 border rounded-full flex items-center gap-5 p-5">
                <p>All Dishes</p>
                <p className="w-auto h-5 bg-black text-white rounded-full font-semibold  text-xs flex items-center p-1">
                  {foods.length}
                </p>
              </button>
            )}
            {category.map((category) => {
              return (
                <CategoryCard
                  key={category._id}
                  name={category.categoryName}
                  categoryId={category._id}
                />
              );
            })}

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center "
                  >
                    <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[460px] flex p-5 flex-col gap-5">
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
        <div className="flex overflow-y-auto h-[870px] ">
          <Product />
        </div>
      </div>
    </div>
  );
};
