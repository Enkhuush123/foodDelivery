import { EditIcon } from "../_icons/edit";

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
import { useState } from "react";
import { DeleteIcon } from "../_icons/deleteIcon";

export const FoodContain = (props) => {
  const { name, ingredients, price, food, token } = props;
  const [editingFood, setEditingFood] = useState({ ...food });
  const [image, setImage] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("foodName", editingFood.foodName);
    data.append("price", editingFood.price);
    data.append("ingredients", editingFood.ingredients);
    if (image) data.append("image", image);

    const response = await fetch(
      `http://localhost:9000/foods/${editingFood._id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }
    );
    if (response.ok) refresh();
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:9000/foods/${editingFood._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) refresh();
  };

  return (
    <div>
      <div className="w-[270.75px] h-[241px] rounded-lg shadow-sm  flex flex-col justify-center  gap-2 p-5">
        <div className="w-[238.75px] h-[129px] flex justify-center relative ">
          <img
            className="w-[238.75px] h-[129px] rounded-lg absolute -z-10"
            src="/food.png"
          ></img>
          <div className="w-full h-full flex justify-end items-end p-2">
            <Dialog>
              <form onSubmit={handleEdit}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 w-11 bg-white rounded-full flex items-center justify-center"
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
                        className="w-[288px] h-9 shadow-sm rounded-lg pl-5"
                      ></input>
                    </div>{" "}
                    <div className="flex justify-between">
                      <p>Dish category</p>
                      <input className="w-[288px] h-9 shadow-sm rounded-lg pl-5"></input>
                    </div>
                    <div className="flex justify-between">
                      <p>Ingredients</p>
                      <input className="w-[288px] h-20 shadow-sm rounded-lg pl-5"></input>
                    </div>
                    <div className="flex justify-between">
                      <p>Price</p>
                      <input className="w-[288px] h-9 shadow-sm rounded-lg pl-5"></input>
                    </div>
                    <button
                      className="w-12 h-10 border border-red-500 flex justify-center items-center"
                      type="button"
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-normal text-sm text-red-600  ">{name}</p>
          <p>{price}</p>
        </div>
        <div>
          <p className="font-normal text-xs">{ingredients}</p>
        </div>
      </div>
    </div>
  );
};
