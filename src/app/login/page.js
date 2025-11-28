"use client";

import { useState } from "react";
import { LeftArrow } from "../_icons/leftArrow";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
import { useUser } from "@/context/userContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFromValid = isValidEmail(email) && password.length >= 6;

  const handleLogin = async () => {
    setError("");
    let error = false;
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      error = true;
    } else {
      setEmailError("");
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      error = true;
    } else {
      setPasswordError("");
    }
    if (error) return;
    try {
      const res = await fetch(
        `https://database-4-5ry8.onrender.com/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (res.status === 400) {
        setEmailError("Email not found.");
        return;
      }

      if (res.status === 401) {
        setPasswordError("Incorrect password.");
        return;
      }
      const data = await res.json();
      if (res.ok) {
        login({
          email: data.user.email,
          role: data.user.role,
          _id: data.user.id,
        });
        localStorage.setItem("token", data.token);
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        console.log(login);
      }
    } catch (err) {
      console.log("cant login");
    }
  };
  return (
    <div className="flex justify-center items-center h-dvh gap-10">
      <div className="flex gap-5 flex-col">
        <div>
          <button
            onClick={() => router.push("/")}
            className="w-9 h-9 border flex justify-center items-center"
          >
            <LeftArrow />
          </button>
        </div>
        <div>
          <p className="font-semibold text-2xl">Log in</p>
          <p className="text-neutral-400">
            Log in to enjoy your favorite dishes
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[416px]  h-9 border rounded-lg p-5 ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email address"
            ></input>
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[416px] h-9 border rounded-lg p-5 ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="Password"
            ></input>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <p>Forgot password?</p>
        </div>
        <div>
          <button
            onClick={handleLogin}
            className={`w-[416px] h-9  rounded-lg cursor-pointer ${
              isFromValid
                ? "bg-blue-500 text-white"
                : "bg-neutral-300 text-black"
            }`}
          >
            <p>Let's Go</p>
          </button>
        </div>
        <div className="flex  justify-center gap-5">
          <p>Don't have an account?</p>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </p>
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
