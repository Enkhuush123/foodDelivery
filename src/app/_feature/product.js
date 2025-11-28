"use client";

import { useEffect, useState } from "react";
import { AllDishes } from "./allDishesCat";

export const Product = () => {
  const [category, setCategory] = useState([]);

  const backend_url = process.env.PUBLIC_BACKEND_URL;
  const option = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getData = async () => {
    const data = await fetch(`${backend_url}/category`, option);
    const jsonData = await data.json();
    setCategory(jsonData);
    console.log(jsonData, "hool2");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-[1950px] h-32   rounded-lg flex flex-col gap-10   ">
      {category.map((category) => (
        <AllDishes
          key={category._id}
          name={category.categoryName}
          categoryId={category._id}
          getData={getData}
        />
      ))}
    </div>
  );
};
