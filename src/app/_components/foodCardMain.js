"use client";
import Image from "next/image";

export const FoodCardMain = ({ ingredients, name, price, img }) => {
  return (
    <div className="w-[397px] h-[342px] bg-white p-5 rounded-lg flex flex-col gap-5  items-center ">
      <div className="w-[365px] h-[210px] relative ">
        <Image
          className="w-[365px] h-[210px] object-cover rounded-lg"
          height={"100"}
          width={"100"}
          src={img || "/food.png"}
          alt={"food image"}
        />
      </div>
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
