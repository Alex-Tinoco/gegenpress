import { createAccount } from "@/lib/auth/account";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Account } from "@models/authmodel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface CreateAccountProps {
  formData: Account
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({ formData, handleChange, togglePasswordVisibility }) => {

  const [errors, setErrors] = useState<Partial<Account>>({});
  const [passwordType, setPasswordType] = useState("password");

  const validation = () => {
    const newErrors: Partial<Account> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {console.log(formData)}, [formData])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      const dataToSend = formData
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createAccount",
          data: dataToSend,
        }),
      });
      const data = await response.json();
      switch (response.status) {
        case 200:
          console.log("User created successfully");
          useRouter().push("/");
          break;
        case 401:
          console.error("Unauthorized: Invalid password");
          break;
        case 202:
          console.log("No user found. Please create an account:");
          break;
        default:
          console.error("Error creating user:", data.error);
          break;
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center absolute top-0 left-0 z-10">
      <div className="h-full w-full backdrop-blur-md absolute"/>
      <div className="flex bg-white/70 shadow-md rounded-md p-8 flex-col items-center justify-center gap-5 md:w-auto relative">
        <button className="text-black p-3" ><XMarkIcon className="text-6xl cursor-pointer text-black"/>  </button>
        <h1 className="text-lg md:text-4xl font-bold">Confirm account creation</h1>
        <p className="text-s w-2/3 text-center text-gray-500">
          It looks like you haven't created an account yet. Simply confirm your password to create one.
        </p>
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={formData.email}
              className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm bg-gray-100 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              name="email"
              disabled
            />
            {errors.email && (
              <p className="text-s translate-x-1 text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Confirm password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row items-center justify-center gap-1.5">
              <input
                type={passwordType}
                placeholder="Confirm previously entered password"
                className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                onChange={handleChange}
                name="passwordrepeat"
              />
              <div onClick={() => togglePasswordVisibility()}>
                {passwordType === "password" ? (
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

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 bg-main py-2 text-white hover:bg-indigo-600"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
