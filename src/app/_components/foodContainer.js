import { EditIcon } from "../_icons/edit";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { refresh } from "next/cache";
import { useState, useEffect } from "react";
import { DeleteIcon } from "../_icons/deleteIcon";
import Image from "next/image";

const option = {
  method: "GET",
  headers: { accept: "application/json" },
};

export const FoodContain = (props) => {
  const { name, ingredients, price, foodId, categoryId, img, setFoods } = props;
  const [category, setCategory] = useState([]);

  const [editingFood, setEditingFood] = useState({
    foodName: name || "",
    ingredients: ingredients || "",
    price: price || "",
    category: categoryId || "",
  });
  const getData = async () => {
    const data = await fetch(`http://localhost:9000/category`, option);
    const json = await data.json();
    setCategory(json);
    console.log(json, "data");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:9000/foods/${foodId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0ZGFhM2E5YjFmZDk2ODkxZTBhMyIsImVtYWlsIjoiZW5odXVzaGFxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MjM5MzczMSwiZXhwIjoxNzYyOTk4NTMxfQ.zHiAUeDhoeD9YdM_kQsFC6CAuL7PfI8aXgqLNwasIuA`,
      },
      body: JSON.stringify({
        foodName: editingFood.foodName,
        category: categoryId,
        ingredients: editingFood.ingredients,
        price: editingFood.price,
      }),
    });
    if (response.ok) {
      const updatedFood = await response.json();
      setFoods((prev) => prev.map((f) => (f._id === foodId ? updatedFood : f)));
      res.json(updatedFood);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:9000/foods/${foodId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0ZGFhM2E5YjFmZDk2ODkxZTBhMyIsImVtYWlsIjoiZW5odXVzaGFxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MjM5MzczMSwiZXhwIjoxNzYyOTk4NTMxfQ.zHiAUeDhoeD9YdM_kQsFC6CAuL7PfI8aXgqLNwasIuA`,
      },
    });
    if (response.ok) {
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-wrap">
      <div className="w-[270.75px] h-[241px] rounded-lg shadow-sm  flex flex-col justify-center  gap-2 p-5">
        <div className="w-[238.75px] h-[129px] flex justify-center relative ">
          <Image
            className="w-[238.75px] h-[129px] absolute z-50 object-cover  rounded-lg"
            height={"100"}
            width={"100"}
            src={img || "/food.png"}
            alt={editingFood.image || "food image"}
          />
          <div className="w-full h-full flex justify-end items-end p-2"></div>
          <div className="w-full h-full flex justify-end items-end p-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-11 bg-white rounded-full flex items-center justify-center inset-0 z-50 "
                >
                  <EditIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[472px]">
                <DialogHeader>
                  <DialogTitle>Dishes info</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <p>Dish name</p>
                    <input
                      value={editingFood.foodName}
                      onChange={(e) =>
                        setEditingFood({
                          ...editingFood,
                          foodName: e.target.value,
                        })
                      }
                      placeholder="Type food name..."
                      className="w-[288px] h-9 border rounded-lg pl-5"
                    ></input>
                  </div>
                  <div className="flex justify-between">
                    <p>Dish category</p>
                    <Select>
                      <SelectTrigger className="w-[288px]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {category.map((cat) => (
                            <SelectItem value={cat._id} key={cat._id}>
                              {cat.categoryName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between">
                    <p>Ingredients</p>
                    <textarea
                      className="w-[288px] h-20  rounded-lg p-2 border"
                      placeholder="Type a ingredients"
                    ></textarea>
                  </div>
                  <div className="flex justify-between">
                    <p>Price</p>
                    <input
                      className="w-[288px] border h-9 shadow-sm rounded-lg pl-5"
                      placeholder="Type a price"
                    ></input>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    className="w-12 h-10 border bg-none border-red-500 flex justify-center items-center "
                    type="button"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </Button>

                  <Button onClick={handleEdit}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-normal text-sm text-red-600  ">{name}</p>
          <p>{price}</p>
        </div>
        <div>
          <p className="font-normal text-xs h-8 wrap-anywhere ">
            {ingredients}
          </p>
        </div>
      </div>
    </div>
  );
};
