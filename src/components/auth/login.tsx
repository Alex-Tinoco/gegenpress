"use client";

import {
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Account } from "@models/authmodel";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState<Account>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Account>>({});

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validation = () => {
    const errors: Partial<Account> = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = validation();
    if (isValid) {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createAccount",
          data: formData,
        }),
      });
      if (response.ok) {
        console.log("User created");
      } else {
        const data = await response.json();
        console.error("Error creating user:", data.error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-2/3 flex-col items-center justify-center gap-5 md:w-1/2">
        <h1 className="text-4xl font-bold">Get Started</h1>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-3 hover:bg-gray-100">
            <img src="/icons/google.png" className="h-6" alt="Google Logo" />
            Sign in with Google
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-3 hover:bg-gray-100">
            <img src="/icons/discord.png" className="h-6" alt="Google Logo" />
            Sign in with Discord
          </button>
        </div>
        <div className="flex w-full flex-row gap-3">
          <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
          <span className="mx-1 flex-shrink text-gray-400">OR</span>
          <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
        </div>
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Jack@mail.com"
              className="w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500"
              onChange={handleChange}
              name="email"
            />
            {errors.email && (
              <p className="text-s translate-x-1 text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row items-center justify-center gap-1.5">
              <input
                type={passwordType}
                placeholder="8+ characters required"
                className="w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500"
                onChange={handleChange}
                name="password"
              />
              <div onClick={togglePasswordVisibility}>
                {passwordVisibility ? (
                  <EyeIcon className="h-9 cursor-pointer rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100" />
                ) : (
                  <EyeSlashIcon className="h-9 cursor-pointer rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-s translate-x-1 text-red-500">
                {errors.password}
              </p>
            )}
          </div>
          <span className="text-s text-right underline">
            <Link href={"/"}>I forgot my password</Link>
          </span>

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 bg-indigo-500 py-2 text-white hover:bg-indigo-600"
          >
            Sign in or create account
          </button>
        </form>
      </div>
    </div>
  );
}
