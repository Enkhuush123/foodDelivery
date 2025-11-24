"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HomeHeader } from "./_feature/homeHeader";
import { BG } from "./_feature/headerBG";
import { CategoryContain } from "./_feature/categoryContainer";
import { DishesMain } from "./_feature/DishesMain";
import { Footer } from "./_feature/footerMain";

export default function Home() {
  return (
    <div className="bg-neutral-700 flex flex-col gap-20 w-full max-sm:w-full">
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
