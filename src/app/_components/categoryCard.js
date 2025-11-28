"use client";
import { useState, useEffect } from "react";
const option = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const CategoryCard = ({ name, categoryId }) => {
  const [foods, setFoods] = useState([]);
  const getData = async () => {
    const data = await fetch(
      `https://database-4-5ry8.onrender.com/${categoryId}`,
      option
    );
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "catjsgd");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex gap-2 ">
        <button className="w-auto h-9 border rounded-full flex items-center gap-5 p-5">
          <p>{name}</p>
          <p className="w-auto h-5 bg-black text-white rounded-full font-semibold  text-xs flex items-center p-1">
            {foods.length}
          </p>
        </button>
      </div>
    </div>
  );
};
