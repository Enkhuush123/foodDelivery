"use client";

import { useEffect, useState } from "react";
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
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0ZGFhM2E5YjFmZDk2ODkxZTBhMyIsImVtYWlsIjoiZW5odXVzaGFxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MjEzNjQ3MCwiZXhwIjoxNzYyMTM3MDcwfQ.oh8wH0ufJ8JD_zGWjhRvUffk05KlPfgEpSf7wUfMlKI";
  const option = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getData = async () => {
    const data = await fetch("http://localhost:9000/foods", option);
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "foods");
  };

  const handleAddfood = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },

      body: JSON.stringify({
        foodName,
        price,
        ingredients,
        image,
        category: "68f852d45842bc55f24d5e90",
      }),
    });

    if (response.ok) {
      console.log("New food added");
      getData();
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="pl-5">
      <div className="w-[1950px]   shadow-sm rounded-lg gap-2 ">
        <div className="p-5">
          <p className="font-semibold text-xl">Salads (3)</p>
        </div>
        <div className=" flex flex-wrap items-center  gap-5 p-5">
          <div className="w-[270.75px] h-[241px] rounded-lg border border-dashed border-red-600 flex flex-col justify-center items-center gap-2 p-5">
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
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        className="w-[194px] h-[38px] border border-gray-400 rounded-lg pl-3"
                        placeholder="Type food name...
                  "
                      ></input>
                    </div>
                    <div>
                      <p>Food price</p>
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-[194px] h-[38px] border border-gray-400 rounded-lg pl-3"
                        placeholder="Enter price..."
                      ></input>
                    </div>
                  </div>
                  <div>
                    <p>Ingredients</p>
                    <input
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="List ingredients..."
                      className="w-[412px] h-[90px]  pl-5  border border-gray-400 rounded-lg "
                    ></input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Food image</p>
                    <div className="w-[412px] h-[138px] border border-dashed bg-blue-50 flex justify-center items-center flex-col">
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0].name)}
                      ></input>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddfood} type="submit">
                      Add dish
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <div>
              <p className="font-normal text-sm">Add new Dish to Appetizers </p>
            </div>
          </div>
          {foods.map((food) => {
            return (
              <FoodContain
                key={food._id}
                name={food.foodName}
                price={food.price}
                ingredients={food.ingredients}
                onEdit={() => setEditingFood(food)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
