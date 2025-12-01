"use client";

import { Category } from "@/app/_feature/category";
import { Navigation02 } from "@/app/_feature/navigation02";
import { Product } from "@/app/_feature/product";

export default function foodMenu() {
  return (
    <div className="flex flex-row max-sm:flex-col shadow-sm bg-neutral-100  w-full max-sm:w-full ">
      <Navigation02 />

      <Category />
    </div>
  );
}
