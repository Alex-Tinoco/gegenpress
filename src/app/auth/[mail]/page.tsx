"use client";
import { CreateAccount } from "@/components/auth/CreateAccount";
import { usePathname } from "next/navigation";

export default function RegisterPage() {
  const mail = usePathname()?.split("/").pop() || undefined;
  console.log(mail);
  return (
    <div className="flex h-screen w-full flex-row">
      <CreateAccount email={mail} />
    </div>
  );
}
