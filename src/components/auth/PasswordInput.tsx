import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Errors } from "@models/authmodel";

interface PasswordInputProps {
  name: string;
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Errors;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  handleChange,
  errors,
}) => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (inputName: string) => {
    setVisibility((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-s translate-x-1">
        {label} <span className="text-red-600">*</span>
      </label>
      <div className="flex flex-row items-center justify-center gap-1.5">
        <input
          type={visibility[name] ? "text" : "password"}
          placeholder={`${label}`}
          className={`focus:border-dark w-full rounded-md border border-gray-400 p-2 text-sm hover:bg-gray-200/60 ${
            errors[name] ? "border border-red-500" : ""
          }`}
          onChange={handleChange}
          name={name}
        />
        <div onClick={() => togglePasswordVisibility(name)}>
          {visibility[name] ? (
            <EyeIcon className="border-dark text-dark h-9 cursor-pointer rounded-md border p-1 hover:bg-gray-200/60" />
          ) : (
            <EyeSlashIcon className="border-gray-400- h-9 cursor-pointer rounded-md border p-1 text-gray-400 hover:bg-gray-200/60" />
          )}
        </div>
      </div>
      {errors[name] && (
        <p className="text-s translate-x-1 text-red-500">{errors[name]}</p>
      )}
    </div>
  );
};

export default PasswordInput;
