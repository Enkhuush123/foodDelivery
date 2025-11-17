"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidPassword = password.length >= 6;

  const handleSignup = async () => {
    if (!isValidPassword) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          phoneNumber: "",
          address: "",
          role: "USER",
        }),
      });

      const data = await res.json();

      if (res.status === 400) {
        setError("Email already exists.");
        return;
      }

      if (!res.ok) {
        setError(data.message);
        return;
      }

      alert("Account created!");
      router.push("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xl font-semibold">Create a password</p>
          <p className="text-neutral-400">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <p className="text-neutral-500">Email: {email}</p>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={`w-[416px] h-10 border p-3 rounded-lg ${
            error ? "border-red-500" : ""
          }`}
          placeholder="Enter password"
        />

        {error && <p className="text-red-500">{error}</p>}

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
