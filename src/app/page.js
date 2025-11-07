"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="bg-white flex justify-center items-center h-screen w-screen">
      MAIN PAGE{" "}
    </div>
  );
}
