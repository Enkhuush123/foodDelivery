"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HomeHeader } from "./_feature/homeHeader";
import { BG } from "./_feature/headerBG";
import { CategoryContain } from "./_feature/categoryContainer";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="bg-neutral-700">
      <HomeHeader />
      <BG />
      <CategoryContain />
    </div>
  );
}
