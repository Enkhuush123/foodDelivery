"use client";

import { useState } from "react";
import { LeftArrow } from "../_icons/leftArrow";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(`http://localhost:9000/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const { token } = await res.json();

      localStorage.setItem("token", token);
      router.push("/");
      router;
    } catch (err) {
      console.log("cant login");
    }
  };
  return (
    <div className="flex justify-center items-center h-dvh gap-10">
      <div className="flex gap-5 flex-col">
        <div>
          <button className="w-9 h-9 border flex justify-center items-center">
            <LeftArrow />
          </button>
        </div>
        <div>
          <p className="font-semibold text-2xl">Log in</p>
          <p>Log in to enjoy your favorite dishes</p>
        </div>
        <div className="flex flex-col gap-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-[416px] h-9 border rounded-lg p-5"
            placeholder="Enter your email address"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-[416px] h-9 border rounded-lg p-5"
            placeholder="Password"
          ></input>
        </div>
        <div>
          <p>Forgot password?</p>
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="w-[416px] h-9 bg-neutral-300 rounded-lg"
          >
            <p>Let's Go</p>
          </button>
        </div>
        <div className="flex  justify-center gap-5">
          <p>Don't have an account?</p>
          <p>Sign up</p>
        </div>
      </div>
      <div className="w-[1000px] h-[904px]">
        <img
          className="w-[1000px] h-[904px] object-cover"
          src="/icon.jpg"
          alt="icon"
        ></img>
      </div>
    </div>
  );
}
