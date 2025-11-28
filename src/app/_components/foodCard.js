"use client";

import { useState } from "react";
import { Arrow } from "../_icons/arrows";
import { DownArrow } from "../_icons/downArrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const FoodCards = (props) => {
  const {
    foods,
    index,
    email,
    foodNumber,
    date,
    totalPrice,
    address,
    updateFoodId,
    isSelected,
    toggleSelect,
    getData,
  } = props;
  console.log(foods, "pzda");
  const [deliveryState, setDeliveryState] = useState(props.status || "");

  const handleChangeDelivery = async (newState) => {
    setDeliveryState(newState);

    const response = await fetch(
      `https://database-4-5ry8.onrender.com/foodOrder/${updateFoodId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newState }),
      }
    );
    if (response.ok) {
      await getData();
    }
  };
  const formatDate = new Date(date)
    .toLocaleDateString("en-CA")
    .replace(/-/g, "/");

  return (
    <div className="  h-14 flex justify-between p-5 shadow-sm items-center hover:bg-neutral-300   ">
      <div>
        <input
          checked={isSelected}
          onChange={toggleSelect}
          type="checkbox"
        ></input>
      </div>
      <div className="w-14 h-[52px] flex items-center justify-center ">
        <p>{index}</p>
      </div>
      <div className="w-[213px] h-[52px] flex items-center  p-5 justify-center">
        <p>{email}</p>
      </div>
      <div className="w-40 h-[52px] flex items-center justify-center gap-5 ">
        <p>
          {foodNumber} {foodNumber === 1 ? "food" : "foods"}
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-5 justify-center   cursor-pointer ">
              <DownArrow />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-100 flex flex-col gap-5 z-50 inset-0 bg-white">
            {foods.map((item) => {
              const price = item.food?.price * item.quantity || 0;

              return (
                <div className="flex justify-between" key={item._id}>
                  <div className="w-[239px] h-[30px] flex gap-2 ">
                    <img className="w-8 h-[30px]" src={item.food?.image} />
                    <span>{item.food?.foodName}</span>
                  </div>
                  <span className="font-normal text-sm">
                    {price}₮ x {item.quantity}
                  </span>
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center w-40 h-[52px] justify-center">
        <p>{formatDate}</p>
      </div>
      <div className="w-40 h-[52px] flex items-center justify-center">
        <p>{totalPrice}₮</p>
      </div>
      <div className="w-[213px] h-[52px] flex items-center justify-center">
        <p>{address}</p>
      </div>
      <div className="flex items-center  w-40 h-[52px] justify-center">
        <select
          value={deliveryState}
          onChange={(e) => handleChangeDelivery(e.target.value)}
          className={` rounded-full w-auto  h-10 border ${
            deliveryState === "PENDING"
              ? " border border-red-500 text-black"
              : " "
          }
            ${
              deliveryState === "DELIVERED"
                ? " border border-green-500 text-black"
                : " "
            }
            ${
              deliveryState === "CANCELLED"
                ? " border border-neutral-300 text-black"
                : " "
            }  `}
        >
          <option value="PENDING">Pending</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
};
