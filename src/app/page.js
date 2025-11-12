"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HomeHeader } from "./_feature/homeHeader";
import { BG } from "./_feature/headerBG";
import { CategoryContain } from "./_feature/categoryContainer";
import { DishesMain } from "./_feature/DishesMain";
import { Footer } from "./_feature/footerMain";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="bg-neutral-700 flex flex-col gap-5">
      <div>
        <HomeHeader />
        <BG />
      </div>
      <CategoryContain />
      <DishesMain />
      <Footer />
    </div>
  );
}
