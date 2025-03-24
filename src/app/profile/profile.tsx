"use client";
import Bookings from "@/components/bookings";
import Profile from "@/components/profile";
import Security from "@/components/security";
import {
  CalendarDaysIcon,
  CalendarIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Account, Payload } from "@models/authmodel";
import { Booking, Place } from "@models/bookings";
import { useEffect, useState } from "react";

interface ProfileProps {
  payload: Payload;
  userInfo: Account;
  bookings: Booking[];
  places: Place[];
}

export default function ProfileComponent({
  payload,
  userInfo,
  bookings,
  places,
}: ProfileProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="center-flex h-screen w-screen flex-col drop-shadow-2xl">
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
          <Bookings userId={payload.id} bookings={bookings} places={places} />
        ) : selectedTab == 2 ? (
          <Security userId={payload.id} userInfo={userInfo} />
        ) : null}
      </div>
    </div>
  );
}
