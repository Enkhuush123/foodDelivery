"use client";

import { useEffect, useState } from "react";
import { FoodContain } from "../_components/foodContainer";
import { AddFoodDialog } from "../_components/addFoodDialog";

export const AllDishes = ({ name, categoryId }) => {
  const [foods, setFoods] = useState([]);

  const backend_url = process.env.PUBLIC_BACKEND_URL;

  const option = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const getData = async () => {
    const data = await fetch(`${backend_url}/${categoryId}`, option);
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "haha");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="shadow-sm rounded-lg flex flex-col bg-white w-[1950px]">
      <div className="p-5">
        <p className="font-semibold text-xl">
          {name} {foods.length}
        </p>
      </div>
      <div className=" flex flex-wrap items-center  gap-5 p-5">
        <AddFoodDialog
          categoryId={categoryId}
          setFoods={setFoods}
          name={name}
          getData={getData}
        />
        {foods.map((food, index) => {
          return (
            <FoodContain
              key={food._id || index}
              name={food.foodName}
              price={food.price}
              ingredients={food.ingredients}
              foodId={food._id}
              img={food.image}
              setFoods={setFoods}
              categoryId={categoryId}
              getFood={getData}
            />
          );
        })}
      </div>
    </div>
  );
};
