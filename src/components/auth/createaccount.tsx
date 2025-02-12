"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    password: "",
    passwordrepeat: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [errors, setErrors] = useState({});
  const provenance = "local";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (false) {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "checkAccount",
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
        // Account creation:
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
              placeholder="Jack@mail.com"
              className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500${errors && "border-1 border-red-500"}`}
              onChange={handleChange}
              name="email"
            />
            {errors && <p className="text-s translate-x-1 text-red-500">{}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row items-center justify-center gap-1.5">
              <input
                type={passwordType}
                placeholder="8+ characters required"
                className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500${errors && "border-1 border-red-500"}`}
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
            {errors && <p className="text-s translate-x-1 text-red-500">{}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Confirm password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row items-center justify-center gap-1.5">
              <input
                type={passwordType}
                placeholder="8+ characters required"
                className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-100 focus:border-indigo-500${errors && "border-1 border-red-500"}`}
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
            {errors && <p className="text-s translate-x-1 text-red-500">{}</p>}
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
}
