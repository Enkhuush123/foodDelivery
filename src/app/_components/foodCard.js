"use client";

import { useState } from "react";
import { Arrow } from "../_icons/arrows";
import { DownArrow } from "../_icons/downArrow";

export const FoodCards = (props) => {
  const { updateFoodId, index } = props;
  const [showFoods, setShowFoods] = useState(false);
  const [deliveryState, setDeliveryState] = useState("");

  const handleChangeDelivery = async (newState) => {
    setDeliveryState(newState);

    const response = await fetch(
      `http://localhost:9000/foodOrder/${updateFoodId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newState }),
      }
    );
    console.log(response, "haha");
  };
  console.log(updateFoodId, "hhehe");

  return (
    <div className="  h-14 flex justify-between p-5 shadow-sm items-center  bg-white   ">
      <div>
        <input type="checkbox"></input>
      </div>
      <div className="w-14 h-[52px] flex items-center justify-center ">
        <p>{index}</p>
      </div>
      <div className="w-[213px] h-[52px] flex items-center  p-5 justify-center">
        <p>{updateFoodId?.user?.email}</p>
      </div>
      <div className="w-40 h-[52px] flex items-center justify-center ">
        <button
          onClick={() => setShowFoods(!showFoods)}
          className="flex items-center gap-5 justify-center  "
        >
          <p>{updateFoodId?.foodOrderItems?.length || 0} foods</p> <DownArrow />
        </button>
      </div>
      <div className="flex items-center w-40 h-[52px] justify-center">
        <p>{new Date(updateFoodId?.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="w-40 h-[52px] flex items-center justify-center">
        <p>{updateFoodId?.totalPrice?.toFixed(2) || "0.00"}</p>
      </div>
      <div className="w-[213px] h-[52px] flex items-center justify-center">
        <p>{updateFoodId?.user?.address}</p>
      </div>
      <div className="flex items-center  w-40 h-[52px] justify-center">
        <select
          value={deliveryState}
          onChange={(e) => handleChangeDelivery(e.target.value)}
          className={` rounded-full w-auto  h-10 border ${
            deliveryState === "Pending"
              ? " border border-red-500 text-black"
              : " "
          }
            ${
              deliveryState === "Delivered"
                ? " border border-green-500 text-black"
                : " "
            }
            ${
              deliveryState === "Canceled"
                ? " border border-neutral-300 text-black"
                : " "
            }  `}
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      {showFoods && (
        <div className="w-[263px] h-auto shadow-sm p-5 absolute z-50">
          {updateFoodId?.foodOrderItems.map((item, indx) => (
            <div className="w-[239px] h-[30px]" key={item._id || indx}>
              <p className="text-black">{item?.food?.foodName}</p>
              <p>{item?.quantity}</p>
              <p>{item?.food?.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
