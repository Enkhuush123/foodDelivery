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
import { useCart } from "@/context/cartContext";
import { is } from "date-fns/locale";
import { CheckIcon } from "lucide-react";
import { CheckedIcon } from "../_icons/checkedIcon";
import { useState } from "react";

export const FoodCardMain = ({ ingredients, name, price, img }) => {
  const { addToCart, cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const isAdded = cartItems.some((item) => item.name === name);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      name,
      price,
      img,
      ingredients,
      totalPrice: price * quantity,
      quantity,
    });
  };
  return (
    <div className="w-[397px] h-[342px] bg-white p-5 rounded-lg flex flex-col gap-5  items-center ">
      <Dialog open={open} onOpenChange={setOpen}>
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
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-11 h-11 bg-white flex justify-center items-center z-40  inset-0 rounded-full ${
                  isAdded ? "bg-black text-white" : "bg-black"
                }  `}
              >
                {isAdded ? <CheckedIcon /> : <PlusIconRed />}
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
                    <p className="font-semibold text-2xl">
                      {price * quantity}₮
                    </p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <button
                      onClick={decrease}
                      className="w-11 h-11 bg-white border rounded-full flex items-center justify-center"
                    >
                      <NegativeIcon />
                    </button>
                    <p>{quantity}</p>
                    <button
                      onClick={increase}
                      className="w-11 h-11 bg-white border rounded-full flex justify-center items-center"
                    >
                      {" "}
                      <PlusBlack />
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-[377px] h-11 rounded-lg"
                  type="submit"
                >
                  Add to cart
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
