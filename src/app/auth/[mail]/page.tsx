"use client";
import { CreateAccount } from "@/components/auth/createaccount";
import { usePathname } from "next/navigation";

export default function RegisterPage() {
  const mail = usePathname()?.split("/").pop() || undefined;
  return (
    <div className="flex h-screen w-full flex-row">
      <CreateAccount email={mail} />
    </div>
  );
}
