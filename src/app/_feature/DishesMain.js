import { useEffect, useState } from "react";
import { CategoryDishes } from "./categoryDishesMain";

export const DishesMain = ({ selectedCategory }) => {
  const option = { method: "GET", headers: { accept: "application/json" } };
  const [category, setCategory] = useState([]);
  const [foods, setFoods] = useState([]);
  const getData = async () => {
    const data = await fetch(`http://localhost:9000/category`, option);
    const json = await data.json();
    setCategory(json);
    console.log(json, "cat");
  };

  const getFoods = async () => {
    const res = await fetch(`http://localhost:9000/foods`, option);
    const data = await res.json();
    setFoods(data);
  };

  useEffect(() => {
    getData();
    getFoods();
  }, []);

  const filteredFoods =
    selectedCategory === "ALL"
      ? foods
      : foods.filter((food) => food.categoryId === selectedCategory);
  return (
    <div className="flex flex-col gap-20 w-[1700px] max-sm:w-full m-auto ">
      {(selectedCategory === "ALL"
        ? category
        : category.filter((cat) => cat._id === selectedCategory)
      ).map((cat) => (
        <CategoryDishes
          key={cat._id}
          name={cat.categoryName}
          categoryId={cat._id}
          foods={filteredFoods.filter((food) => food.categoryId === cat._id)}
        />
      ))}
    </div>
  );
};
