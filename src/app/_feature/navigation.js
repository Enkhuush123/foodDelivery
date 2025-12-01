"use client";

import { WebLogo } from "../_icons/logo";
import { Vector } from "../_icons/vector";
import { Vehicle } from "../_icons/vehicle";
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter();

  return (
    <div className="w-[205px] max-sm:w-full max-sm:h-auto max-sm:items-center max-sm:flex-row h-dvh shadow-sm flex flex-col gap-10 bg-white ">
      <div className="flex p-5  gap-2 ">
        <div className="flex items-center">
          <WebLogo />
        </div>
        <div>
          <p className="font-semibold text-lg">NomNom</p>
          <p className="font-normal text-xs ">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 max-sm:flex-row">
        <div className="flex  justify-center  ">
          <button
            onClick={() => router.push("/admin/foodMenu")}
            className="flex items-center  w-[165px] h-10 rounded-full  gap-2 p-5    "
          >
            <Vector /> <p className="font-medium text-sm">Food menu</p>
          </button>
        </div>
        <div className="flex justify-center">
          <button className="bg-black w-[165px] h-10 rounded-full flex items-center gap-2 p-5">
            <Vehicle /> <p className="text-white">Orders</p>
          </button>
        </div>
      </div>
    </div>
  );
};
