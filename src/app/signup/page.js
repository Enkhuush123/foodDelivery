"use client";

import { useRouter } from "next/navigation";
import { LeftArrow } from "../_icons/leftArrow";
import { useState } from "react";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isFromValid = isValidEmail(email);
  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:9000/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: "",
          phoneNumber: "",
          address: "",
          role: "USER",
        }),
      });

      const data = await res.json();
      if (data.exists) {
        setEmailError("Email already in use.");
        return;
      }
      router.push(`/signup/password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.log(err);
      setEmailError("Something went wrong.");
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
          <p className="font-semibold text-2xl">Create your account</p>
          <p className="text-neutral-400">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[416px] h-9 border rounded-lg p-5 ${
                emailError ? "border-red-500" : ""
              } `}
              placeholder="Enter your email address"
            ></input>
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={handleSignup}
            className={`w-[416px] h-9 rounded-lg cursor-pointer ${
              isFromValid ? "bg-black text-white" : "bg-neutral-300"
            } `}
          >
            <p>Let's Go</p>
          </button>
        </div>
        <div className="flex  justify-center gap-5">
          <p>Already have an account?</p>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log in
          </p>
        </div>
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
