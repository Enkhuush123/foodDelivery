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
import { Plus } from "../_icons/plus";
import { useEffect, useState } from "react";

const UPLOAD_PRESET = "fooood";
const CLOUD_NAME = "dhms3cyil";

export const AddFoodDialog = ({ categoryId, name, getData }) => {
  const [newFood, setNewFood] = useState({
    foodName: "",
    price: "",
    ingredients: "",
  });

  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

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
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0ZGFhM2E5YjFmZDk2ODkxZTBhMyIsImVtYWlsIjoiZW5odXVzaGFxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MjM5MzczMSwiZXhwIjoxNzYyOTk4NTMxfQ.zHiAUeDhoeD9YdM_kQsFC6CAuL7PfI8aXgqLNwasIuA";
  const addDish = async () => {
    const res = await fetch(`http://localhost:9000/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        foodName: newFood.foodName,
        price: newFood.price,
        ingredients: newFood.ingredients,
        category: categoryId,
        image: logoUrl,
      }),
    });
    if (!res.ok) console.log("failed to add food");
    await getData();

    setAlertMessage(`Dish "${newFood.foodName}" added successfully!`);

    setTimeout(() => setAlertMessage(""), 3000);
  };
  return (
    <div className="w-[270.75px] h-[241px] rounded-lg border border-dashed border-red-600 flex flex-col justify-center items-center gap-2 p-5 hover:bg-red-100">
      {alertMessage && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-50">
          {alertMessage}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
          >
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[460px] flex p-5 flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Add new Dish to {name}</DialogTitle>
          </DialogHeader>

          <div className="flex justify-between gap-4">
            <div className="flex flex-col flex-1">
              <p>Food name</p>
              <input
                type="text"
                className="border rounded p-1"
                value={newFood.foodName}
                onChange={(e) =>
                  setNewFood({ ...newFood, foodName: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <p>Food price</p>
              <input
                type="text"
                className="border rounded p-1"
                value={newFood.price}
                onChange={(e) =>
                  setNewFood({ ...newFood, price: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <p>Ingredients</p>
            <textarea
              type="text"
              className="border h-20 p-2 rounded w-full"
              value={newFood.ingredients}
              onChange={(e) =>
                setNewFood({ ...newFood, ingredients: e.target.value })
              }
              required
            />
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

              {uploading && <p className="text-blue-600">Uploading...</p>}

              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-gray-500 text-sm">Click to upload image</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                addDish();
                setOpen(false);
              }}
            >
              Add dish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        <p className="font-normal text-sm">Add new Dish to {name} </p>
      </div>
    </div>
  );
};
