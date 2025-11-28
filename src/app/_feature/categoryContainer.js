"use client";

import { useEffect, useState } from "react";

import { CategoryCards } from "../_components/categoryContain";

import { RightArrowWhite } from "../_icons/rightArrowWhite";
import { LeftArrowWhite } from "../_icons/leftArrowWhite";

const option = { method: "GET", headers: { accept: "application/json" } };

export const CategoryContain = ({ selectedCategory, setSelectedCategory }) => {
  const [getCategory, setGetCategory] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://database-4-5ry8.onrender.com/category`,
      option
    );
    const jsonData = await data.json();
    setGetCategory(jsonData);
    console.log(jsonData, "haha");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-[1700px] max-sm:w-full max-sm:m-auto   flex flex-col gap-9 m-auto">
      <div>
        <p className="font-semibold text-3xl text-white">Category</p>
      </div>
      <div className="flex gap-2 items-center">
        <LeftArrowWhite />
        <button
          className={`w-auto h-9  rounded-full flex items-center gap-5 p-3 ${
            selectedCategory === "ALL"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setSelectedCategory("ALL")}
        >
          All Dishes
        </button>
        {getCategory.map((cat) => (
          <button
            key={cat._id}
            className={`w-auto h-9  rounded-full flex items-center gap-5 p-3 ${
              selectedCategory === cat._id
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedCategory(cat._id)}
          >
            {cat.categoryName}
          </button>
        ))}
        <RightArrowWhite />
      </div>
    </div>
  );
};
