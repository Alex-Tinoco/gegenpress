"use client";
import { Account, Payload } from "@models/authmodel";
import { useEffect } from "react";

interface ProfileProps {
  payload: Payload;
  userInfo: Account;
}

const Profile: React.FC<ProfileProps> = ({ payload, userInfo }) => {
  useEffect(() => {
    console.log("User info changed:", userInfo);
  }, [userInfo]); // Runs only when `payload` updates
  return (
    <div className="center-flex mt-1 flex w-full flex-col gap-2">
      <h1 className="text-3xl">{payload.name ? payload.name : "No name"}</h1>
      <p className="text-light">{payload.email ? payload.email : "No Email"}</p>
      <div className="divider bg-main my-2 h-0.5 w-2/3 self-center" />
      <p className="">{payload.role ? userInfo.gender : "No Gender"}</p>
      <div className="divider bg-main my-2 h-0.5 w-2/3 self-center" />
      <div className="flex flex-col gap-2">
        <button className="btn-primary bg-main-lighter hover:bg-main">
          Edit profile
        </button>
        <button className="btn-primary bg-main-darker hover:bg-main">
          Delete account
        </button>{" "}
      </div>
    </div>
  );
};

export default Profile;
