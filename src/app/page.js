"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HomeHeader } from "./_feature/homeHeader";
import { BG } from "./_feature/headerBG";
import { CategoryContain } from "./_feature/categoryContainer";
import { DishesMain } from "./_feature/DishesMain";
import { Footer } from "./_feature/footerMain";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);
  return (
    <div className="bg-neutral-700 flex flex-col gap-20 w-full max-sm:w-full">
      <div>
        <HomeHeader />
        <BG />
      </div>
      <CategoryContain
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DishesMain selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
}
