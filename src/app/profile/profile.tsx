"use client";
import Profile from "@/components/profile";
import {
  CalendarDaysIcon,
  CalendarIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Account, Payload } from "@models/authmodel";
import { Booking, Place } from "@models/bookings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

interface ProfileProps {
  payload: Payload;
  userInfo: Account;
  bookings: Booking[];
}

export default function ProfileComponent({
  payload,
  userInfo,
  bookings,
}: ProfileProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const maxPlayers = 10;
  const today = new Date();
  const twoMonthsAfter = new Date(today);
  twoMonthsAfter.setMonth(today.getMonth() + 2);
  const router = useRouter();

  useEffect(() => {
    console.log("Payload changed:", payload);
  }, [payload]); // Runs only when `payload` updates

  return (
    <div className="center-flex h-screen w-screen flex-col">
      <ul
        className={`menu lg:menu-horizontal bg-dark rounded-t-md p-0 text-white`}
      >
        <li
          className={`${selectedTab === 0 && "bg-main"} rounded-tl-md`}
          onClick={() => setSelectedTab(0)}
        >
          <a className="">
            <UserIcon className="h-6 w-6" />
            <span className="text-lg">Profile</span>
          </a>
        </li>
        <li
          className={`${selectedTab === 1 && "bg-main"}`}
          onClick={() => setSelectedTab(1)}
        >
          <a>
            <CalendarDaysIcon className="h-6 w-6" />
            <span className="text-lg">Bookings</span>
          </a>
        </li>
        <li
          className={`${selectedTab === 2 && "bg-main"} rounded-tr-md`}
          onClick={() => setSelectedTab(2)}
        >
          {" "}
          <a>
            <ShieldCheckIcon className="h-6 w-6" />
            <span className="text-lg">Security</span>
          </a>
        </li>
      </ul>
      <div className="bg-dark flex w-1/2 justify-center rounded-md p-5 text-white">
        {selectedTab == 0 ? (
          <Profile userId={payload.id} userInfo={userInfo} />
        ) : selectedTab == 1 ? (
          <div>Bookings</div>
        ) : selectedTab == 2 ? (
          <div>?</div>
        ) : null}
      </div>
    </div>
  );
}
