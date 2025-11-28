import { useEffect, useState } from "react";
import { FoodCardMain } from "../_components/foodCardMain";

export const CategoryDishes = ({ name, categoryId }) => {
  const [foods, setFoods] = useState([]);
  const option = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  const getData = async () => {
    const data = await fetch(
      `https://database-4-5ry8.onrender.com/${categoryId}`,
      option
    );
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "foods");
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-5 ">
      <div>
        <p className="text-white font-semibold text-3xl">{name}</p>
      </div>
      <div className="flex gap-5">
        {foods.map((food) => (
          <FoodCardMain
            key={food._id}
            name={food.foodName}
            price={food.price}
            ingredients={food.ingredients}
            img={food.image}
            _id={food._id}
          />
        ))}
      </div>
    </div>
  );
};
