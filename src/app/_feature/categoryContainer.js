"use client";

import { useEffect, useState } from "react";

import { CategoryCards } from "../_components/categoryContain";

import { RightArrowWhite } from "../_icons/rightArrowWhite";
import { LeftArrowWhite } from "../_icons/leftArrowWhite";

const option = { method: "GET", headers: { accept: "application/json" } };

export const CategoryContain = () => {
  const [getCategory, setGetCategory] = useState([]);
  const getData = async () => {
    const data = await fetch(`http://localhost:9000/category`, option);
    const jsonData = await data.json();
    setGetCategory(jsonData);
    console.log(jsonData, "haha");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full max-sm:w-3xl h-44 p-5 flex flex-col gap-9 m-auto">
      <div>
        <p className="font-semibold text-3xl text-white">Category</p>
      </div>
      <div className="flex gap-2 items-center">
        <LeftArrowWhite />
        {getCategory.map((cat) => (
          <CategoryCards key={cat._id} name={cat.categoryName} />
        ))}
        <RightArrowWhite />
      </div>
    </div>
  );
};
