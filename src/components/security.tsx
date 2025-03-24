"use client";
import { Account } from "@models/authmodel";
import { useEffect } from "react";

interface SecurityProps {
  userId: string;
  userInfo: Account;
}

const Security: React.FC<SecurityProps> = ({ userId, userInfo }) => {
  useEffect(() => {
    console.log("Bookings :", userInfo);
  }, [userInfo]);

  return (
    <div className="center-flex mt-4 flex-col gap-4">
      <span className="text-xl">Work in progress</span>
    </div>
  );
};

export default Security;
