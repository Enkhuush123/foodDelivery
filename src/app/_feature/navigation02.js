"use client";

import { WebLogo } from "../_icons/logo";
import { Vector02 } from "../_icons/vector02";
import { Vehicle02 } from "../_icons/vehicle02";
import { useRouter } from "next/navigation";
export const Navigation02 = () => {
  const router = useRouter();
  return (
    <div className="w-[205px] max-sm:w-full max-sm:h-auto max-sm:flex max-sm:flex-row items-center  max-h-[1200px]  shadow-sm flex flex-col gap-10 bg-white  ">
      <div
        className="flex p-5  gap-2  cursor-pointer "
        onClick={() => router.push("/")}
      >
        <div className="flex items-center">
          <WebLogo />
        </div>
        <div>
          <p className="font-semibold text-lg">NomNom</p>
          <p className="font-normal text-xs ">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 max-sm:flex-row">
        <div className="flex justify-center ">
          <button className="bg-black w-[165px] h-10 rounded-full flex  items-center gap-2 p-5">
            <Vector02 />{" "}
            <p className="font-medium text-sm text-white">Food menu</p>
          </button>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={() => router.push("/admin")}
            className="flex w-[165px] h-10 items-center gap-2 p-5 "
          >
            <Vehicle02 /> <p className="text-black">Orders</p>
          </button>
        </div>
      </div>
    </div>
  );
};
