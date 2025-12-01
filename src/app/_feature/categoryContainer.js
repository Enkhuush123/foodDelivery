"use client";

import { useEffect, useState } from "react";

import { CategoryCards } from "../_components/categoryContain";

import { RightArrowWhite } from "../_icons/rightArrowWhite";
import { LeftArrowWhite } from "../_icons/leftArrowWhite";

const option = { method: "GET", headers: { accept: "application/json" } };

export const CategoryContain = ({ selectedCategory, setSelectedCategory }) => {
  const [getCategory, setGetCategory] = useState([]);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(backend_url, "hahahhaa");

  const getData = async () => {
    const data = await fetch(`${backend_url}/category`, option);
    const jsonData = await data.json();
    setGetCategory(jsonData);
    console.log(jsonData, "haha");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" max-sm:w-full max-sm:flex max-w-[1500px] max-sm:p-5  flex flex-col gap-9 m-auto ">
      <div>
        <p className="font-semibold text-3xl text-white">Category</p>
      </div>
      <div className="flex gap-2 items-center max-sm:justify-center">
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
