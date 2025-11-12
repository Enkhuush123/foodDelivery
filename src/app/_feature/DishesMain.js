import { useEffect, useState } from "react";
import { CategoryDishes } from "./categoryDishesMain";

export const DishesMain = () => {
  const option = { method: "GET", headers: { accept: "application/json" } };
  const [category, setCategory] = useState([]);
  const getData = async () => {
    const data = await fetch(`http://localhost:9000/category`, option);
    const json = await data.json();
    setCategory(json);
    console.log(json, "cat");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full max-sm:w-full m-auto">
      {category.map((cat) => (
        <CategoryDishes
          key={cat._id}
          name={cat.categoryName}
          categoryId={cat._id}
        />
      ))}
    </div>
  );
};
