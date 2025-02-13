import { createAccount } from "@/lib/auth/account";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface Props {
  email: string | undefined;
}

interface createAccountModel {
  name: string;
  email: string;
  password: string;
  passwordrepeat?: string;
}

export const CreateAccount: React.FC<Props> = ({ email }) => {
  const [formData, setFormData] = useState<createAccountModel>({
    name: "",
    email: email || "",
    password: "",
    passwordrepeat: "",
  });
  const [errors, setErrors] = useState<Partial<createAccountModel>>({});
  const provenance = "local";

  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");

  const togglePasswordVisibility = (field: number) => {
    if (field === 1) {
      setPasswordType1((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    } else if (field === 2) {
      setPasswordType2((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validation = () => {
    const newErrors: Partial<createAccountModel> = {};
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
    if (formData.passwordrepeat !== formData.password) {
      newErrors.passwordrepeat = "Passwords must match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {console.log(formData)}, [formData])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      delete formData.passwordrepeat;
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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-2/3 flex-col items-center justify-center gap-5 md:w-1/3">
        <h1 className="text-4xl font-bold">Create an account</h1>
        <p className="text-s w-2/3 text-center text-gray-500">
          {provenance === "local"
            ? "It seems like you don't have an account yet. Here you can create one."
            : "Your password will be stored on our servers."}
        </p>
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={email}
              placeholder="Jack@mail.com"
              className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              name="email"
            />
            {errors.email && (
              <p className="text-s translate-x-1 text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row items-center justify-center gap-1.5">
              <input
                type={passwordType1}
                placeholder="8+ characters required"
                className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                onChange={handleChange}
                name="password"
              />
              <div onClick={() => togglePasswordVisibility(1)}>
                {passwordType1 === "password" ? (
                  <EyeIcon className="h-9 cursor-pointer rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100" />
                ) : (
                  <EyeSlashIcon className="h-9 cursor-pointer rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-s translate-x-1 text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Confirm password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row items-center justify-center gap-1.5">
              <input
                type={passwordType2}
                placeholder="8+ characters required"
                className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500 ${
                  errors.passwordrepeat ? "border-red-500" : ""
                }`}
                onChange={handleChange}
                name="passwordrepeat"
              />
              <div onClick={() => togglePasswordVisibility(2)}>
                {passwordType2 === "password" ? (
                  <EyeIcon className="h-9 cursor-pointer rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100" />
                ) : (
                  <EyeSlashIcon className="h-9 cursor-pointer rounded-md border-1 border-gray-300 p-1 text-gray-300 hover:bg-gray-100" />
                )}
              </div>
            </div>
            {errors.passwordrepeat && (
              <p className="text-s translate-x-1 text-red-500">
                {errors.passwordrepeat}
              </p>
            )}
          </div>

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
};
