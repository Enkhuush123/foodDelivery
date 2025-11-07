"use client";

import { useEffect, useState } from "react";
import { FoodCards } from "../_components/foodCard";
import { Arrow } from "../_icons/arrows";

export const CardHeader = () => {
  const [foodOrders, setFoodOrders] = useState([]);
  const [selecteFoods, setSelectedFoods] = useState([]);

  const getData = async () => {
    const data = await fetch("http://localhost:9000/foodOrder", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const json = await data.json();
    setFoodOrders(json);
    console.log(json, "gg");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="pt-[84px] pl-5">
      <div className="rounded-lg w-[1950px]  ">
        <div className="h-[71px] flex justify-between shadow-sm bg-white p-2  ">
          <div className="pl-4 flex flex-col items-center">
            <p className="font-bold text-xl">Orders</p>
            <p>{foodOrders.length} items</p>
          </div>
          <div className="flex pr-4 items-center gap-3">
            <div className="w-[300px] h-9 rounded-full shadow-sm">
              <input type="date"></input>
            </div>

            <button
              className={`w-[179px] h-9 rounded-full shadow-sm flex items-center justify-center ${
                selecteFoods > 0
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <p>Change delivery state</p>
            </button>
          </div>
        </div>
        <div className="h-14 flex justify-between shadow-sm items-center p-5 bg-white">
          <div>
            <input type="checkbox"></input>
          </div>
          <div className="w-14 h-[52px] flex items-center justify-center">
            <p>№</p>
          </div>
          <div className="w-[213px] h-[52px] flex items-center  justify-center ">
            <p>Customer</p>
          </div>
          <div className="w-40 h-[52px] flex items-center justify-center pr-8 ">
            <p>Food</p>
          </div>
          <div className="flex items-center gap-5 w-40 h-[52px] justify-center">
            <p>Date</p> <Arrow />
          </div>
          <div className="w-40 h-[52px] flex items-center justify-center">
            <p>Total</p>
          </div>
          <div className="w-[213px] h-[52px] flex items-center justify-center">
            <p>Delivery Address</p>
          </div>
          <div className="flex items-center gap-5 w-40 h-[52px] justify-center ">
            <p>Delivery state</p> <Arrow />
          </div>
        </div>
        <div>
          {foodOrders.map((order, index) => (
            <FoodCards key={order._id} updateFoodId={order} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};
