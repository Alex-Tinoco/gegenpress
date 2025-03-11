import { createAccount } from "@/lib/auth/accountdb";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Account } from "@models/authmodel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";

interface CreateAccountProps {
  formData: Account
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRegisterPopUpOpen: React.Dispatch<React.SetStateAction<"open" | "closed">>;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({ formData, setRegisterPopUpOpen }) => {
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordError, setPasswordError] = useState<Record<string, string>>({});

  useEffect(() => {console.log(formData)}, [formData])

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== passwordConfirm) {setPasswordError({ "password repeat": "Passwords must match" });
  } 
    else {
      setPasswordError({"password repeat":""})
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
          toast.success("Your account was successfully created. You can now login.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setRegisterPopUpOpen("closed")
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
              className={`w-full rounded-md border-1 border-gray-300 p-2 text-sm bg-gray-100 focus:border-indigo-500`}
              name="email"
              disabled
            />

          </div>

          <PasswordInput
          name = "password repeat"
          label = "Confirm password"
          handleChange = {handlePasswordConfirmChange}
          errors = {passwordError}
          />
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 bg-main py-2 text-white hover:bg-indigo-600"
          >
            Create account
          </button>
          <span className="flex self-center gap-1"> Already have an account ? <button className="text-main underline cursor-pointer hover:text-main-darker" onClick={() => setRegisterPopUpOpen("closed")}> Go back to login page</button></span>
        </form>
      </div>
    </div>
  );
};
