"use client";

import { LeftArrow } from "@/app/_icons/leftArrow";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassworderror, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = password.length >= 6;
  const isMatchingPassword = password === confirmPassword;

  const handleSignup = async () => {
    setError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!isMatchingPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (!isValidPassword) {
      setError("Password must be at least 6 characters.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch(
        "https://database-4-5ry8.onrender.com/auth/sign-up",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            phoneNumber: "",
            address: "",
            role: "USER",
          }),
        }
      );

      router.push("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 p-10">
      <div className="flex flex-col gap-5">
        <div>
          <button
            onClick={() => router.push("/signup")}
            className="w-9 h-9 border flex justify-center items-center"
          >
            <LeftArrow />
          </button>
        </div>
        <div>
          <p className="font-semibold text-2xl">Create a password</p>
          <p className="text-neutral-400">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <p className="text-neutral-500">Email: {email}</p>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-[416px] h-10 border p-3 rounded-lg ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Enter password"
          />

          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-[416px] h-10 border p-3 rounded-lg ${
              confirmPassworderror ? "border-red-500" : ""
            }`}
            placeholder="Confrim password"
          />
          {confirmPassworderror && (
            <p className="text-red-500">{confirmPassworderror}</p>
          )}
        </div>
        <div className="flex gap-5">
          <input
            onClick={() => setShowPassword(!showPassword)}
            type="checkbox"
          ></input>
          <p>Show password</p>
        </div>
        <button
          onClick={handleSignup}
          className={`w-[416px] h-10 rounded-lg ${
            isValidPassword ? "bg-black text-white" : "bg-neutral-300"
          }`}
        >
          Sign Up
        </button>
      </div>
      <div className="w-[1000px]  h-[904px]">
        <img
          className="w-[1000px] h-[904px] object-cover"
          src="/icon.jpg"
          alt="icon"
        ></img>
      </div>
    </div>
  );
}
