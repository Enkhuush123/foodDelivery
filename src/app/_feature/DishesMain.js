import { useEffect, useState } from "react";
import { CategoryDishes } from "./categoryDishesMain";

export const DishesMain = ({ selectedCategory }) => {
  const option = { method: "GET", headers: { accept: "application/json" } };
  const [category, setCategory] = useState([]);
  const [foods, setFoods] = useState([]);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const getData = async () => {
    const data = await fetch(`${backend_url}/category`, option);
    const json = await data.json();
    setCategory(json);
    console.log(json, "cat");
  };

  const getFoods = async () => {
    const res = await fetch(`${backend_url}/foods`, option);
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
    <div className="flex flex-col gap-20 max-w-[1500px] max-sm:p-5 m-auto max-sm:w-full  ">
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
