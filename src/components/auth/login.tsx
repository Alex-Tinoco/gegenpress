"use client";
import { EyeDropperIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler, useState } from "react";


export default function Login() {
  const[passwordVisibility, setPasswordVisibility] = useState(true);
  const[passwordType, setPasswordType] = useState("password");
  

  const togglePasswordVisibility = () => {
    passwordVisibility ? (
      setPasswordVisibility(false),
      setPasswordType("text")
    ) : (
      setPasswordType("password"),
      setPasswordVisibility(true)
    )
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">Get Started</h1>

      <div className="flex w-1/3 flex-col items-center justify-center gap-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-2 hover:bg-gray-100">
          <img src="/icons/google.png" className="h-6" alt="Google Logo" />
          Sign in with Google
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-2 hover:bg-gray-100">
          <img src="/icons/apple_black.png" className="h-6" alt="Google Logo" />
          Sign in with Apple
        </button>
      </div>

      <div className="flex w-1/3 flex-row gap-3">
        <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
        <span className="mx-1 flex-shrink text-gray-400">OR</span>
        <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
      </div>

      <form className="flex w-1/3 flex-col gap-3">
        <label className="translate-x-1 text-sm">Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border-1 border-gray-300 p-2 text-sm"
          required
        />

        <label className="translate-x-1 text-sm">Password <span className="text-red-600">*</span></label>
        <div className="flex h-full flex-row items-center justify-center gap-1">
          <input
            type={passwordType}
            placeholder="Enter your password"
            className="w-full rounded-md border-1 border-gray-300 p-2 text-sm focus:border-gray-100"
            required
          />
          <div onClick={togglePasswordVisibility}>
            {passwordVisibility? <EyeIcon className="h-9 rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100 cursor-pointer" /> : <EyeSlashIcon className="h-9 rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100 cursor-pointer" />}
          </div>
        </div>
        <button onClick={handleSubmit} className="flex w-full items-center justify-center gap-2 rounded-md border-2 bg-indigo-500 py-2 text-white hover:bg-indigo-600 cursor-pointer">
          Sign in or create account
        </button>
      </form>
    </div>
  );
}
