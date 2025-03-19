"use client";

import { Account, Errors } from "@models/authmodel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CreateAccount } from "./createaccount";
import PasswordInput from "./PasswordInput";

export default function Login() {
  const [formData, setFormData] = useState<Account>({
    name: "",
    email: "",
    password: "",
    memory: true,
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();
  const [RegisterPopUpOpen, setRegisterPopUpOpen] = useState<"open" | "closed">(
    "closed",
  );

  const handleMemoryChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      memory: !prevData.memory,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validation = () => {
    const errors: Errors = {};
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
    const isValid = validation();
    if (isValid) {
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
      switch (response.status) {
        case 200:
          console.log("Logged-in successfully");
          router.push("/");
          break;
        case 401:
          setErrors({ password: "Invalid password" });
          break;
        case 500:
          toast.error("Internal server error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        // Account creation:
        case 202:
          toast.error("No account found, please create a new one", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setRegisterPopUpOpen("open");
          break;
        default:
          console.error("Error creating user:");
          break;
      }
    }
  };

  return (
    <div className="bg-w flex h-screen w-full items-center justify-center">
      <ToastContainer />
      {RegisterPopUpOpen == "open" && (
        <CreateAccount
          formData={formData}
          handleChange={handleChange}
          setRegisterPopUpOpen={setRegisterPopUpOpen}
        />
      )}
      <div className="flex w-2/3 flex-col items-center justify-center gap-5 md:w-1/2">
        <h1 className="text-4xl font-bold">Get Started</h1>
        {/* <div className="flex w-full flex-col items-center justify-center gap-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-3 hover:bg-gray-100 cursor-pointer">
            <img src="/icons/google.png" className="h-6" alt="Google Logo" />
            Sign in with Google
          </button>
          <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-3 hover:bg-gray-100">
            <img src="/icons/discord.png" className="h-6" alt="Google Logo" />
            Sign in with Discord
          </button>
        </div>
        <div className="flex w-full cursor-default flex-row gap-3">
          <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
          <span className="mx-1 flex-shrink text-gray-400">OR</span>
          <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
        </div> */}
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-s translate-x-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className={`focus:border-dark w-full rounded-md border-1 border-gray-300 p-2 text-sm hover:bg-gray-200/60 ${errors.email && "border-1 border-red-500"}`}
              onChange={handleChange}
              name="email"
            />
            {errors.email && (
              <p className="text-s translate-x-1 text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <PasswordInput
            name="password"
            label="Password"
            handleChange={handleChange}
            errors={errors}
          />

          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                checked={formData.memory}
                onChange={handleMemoryChange}
                className="text-main focus:ring-main-darker h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="remember-me"
                className="text-sm font-medium text-gray-700"
              >
                Remember Me
              </label>
            </div>
            {/* <span className="text-s text-right underline">
              <Link href={"/"}>Forget password?</Link>
            </span> */}
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign in or register
          </button>
          <span className="text-md self-center text-center text-gray-700">
            <span className="font-bold">New here?</span> You can create an
            account using this form as well.
          </span>
        </form>
      </div>
    </div>
  );
}
