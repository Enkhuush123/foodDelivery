"use client";

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
  const {
    name,
    ingredients,
    price,
    foodId,
    categoryId,
    img,
    setFoods,
    getFood,
  } = props;
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const [editingFood, setEditingFood] = useState({
    foodName: name || "",
    ingredients: ingredients || "",
    price: price || "",
    category: categoryId || "",
    image: img || logoUrl,
  });
  const getData = async () => {
    const data = await fetch(`http://localhost:9000/category`, option);
    const json = await data.json();
    setCategory(json);
    console.log(json, "data");

    await getFood();
  };

  const handleEdit = async () => {
    const response = await fetch(`http://localhost:9000/foods/${foodId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0ZGFhM2E5YjFmZDk2ODkxZTBhMyIsImVtYWlsIjoiZW5odXVzaGFxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MzAwNDUwMH0.a9cA_NQ6yT8Yg32h6qjVOMtVxqX0spaYy5484ubW4xU`,
      },
      body: JSON.stringify({
        foodName: editingFood.foodName,
        category: editingFood.category,
        ingredients: editingFood.ingredients,
        price: editingFood.price,
        image: editingFood.image,
      }),
    });
    if (response.ok) {
      await getFood();
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
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("Image upload failed");
    }
  };
  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setLogoUrl(url);
      setEditingFood((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const toBase64 = (file) => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-wrap ">
      <div className="w-[270.75px] h-[241px] rounded-lg shadow-sm  flex flex-col justify-center  gap-2 p-5">
        <div className="w-[238.75px] h-[129px] flex justify-center relative ">
          <Image
            className="w-[238.75px] h-[129px] absolute z-50 object-cover  rounded-lg"
            height={"100"}
            width={"100"}
            src={img || "/food.png"}
            alt={editingFood.image || "food image"}
          />

          <div className="w-full h-full flex justify-end items-end p-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-11 bg-white rounded-full flex items-center justify-center inset-0 z-50 "
                >
                  <EditIcon />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[472px] flex p-5 flex-col gap-5 "
                aria-describedby={undefined}
              >
                <DialogHeader>
                  <DialogTitle>Dishes info</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <p className="font-normal text-xs text-neutral-500">
                      Dish name
                    </p>
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
                  <div className="flex justify-between items-center gap-5">
                    <p className="font-normal text-xs text-neutral-500">
                      Dish category
                    </p>
                    <Select
                      value={editingFood.category}
                      onValueChange={(value) =>
                        setEditingFood({ ...editingFood, category: value })
                      }
                    >
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
                  <div className="flex justify-between items-center">
                    <p className="font-normal text-xs text-neutral-500">
                      Ingredients
                    </p>
                    <textarea
                      className="w-[288px] h-20  rounded-lg p-2 border"
                      placeholder="Type a ingredients"
                      value={editingFood.ingredients}
                      onChange={(e) =>
                        setEditingFood({
                          ...editingFood,
                          ingredients: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-normal text-xs text-neutral-500">
                      Price
                    </p>
                    <input
                      className="w-[288px] border h-9 shadow-sm rounded-lg pl-5"
                      placeholder="Type a price"
                      value={editingFood.price ?? ""}
                      onChange={(e) =>
                        setEditingFood({
                          ...editingFood,
                          price: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Food image</p>
                    <div className="w-[412px] h-[138px] border border-dashed bg-blue-50 flex justify-center items-center flex-col relative rounded-lg overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        onChange={handleLogoUpload}
                        disabled={uploading}
                      />

                      {uploading && (
                        <p className="text-blue-600">Uploading...</p>
                      )}

                      {editingFood.image ? (
                        <img
                          src={editingFood.image}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Click to upload image
                        </p>
                      )}
                    </div>
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

                  <Button
                    onClick={() => {
                      handleEdit();
                      setOpen(false);
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-normal text-sm text-red-600  ">{name}</p>
          <p>{price}₮</p>
        </div>
        <div>
          <p className="font-normal text-xs h-8 overflow-auto ">
            {ingredients}
          </p>
        </div>
      </div>
    </div>
  );
};
