"use client";

import Bento from "@/components/bento";
import { MouseEventHandler, useState } from "react";

export default function Home() {
  const LogOut = async () => {
    const response = await fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "logOut",
      }),
    });
    if (response.ok) {
      window.location.href = "/auth";
    }
  };

  return (
    <div className="m-8 flex flex-col flex-wrap gap-4 md:flex-row">
      <button className="btn btn-secondary" onClick={() => LogOut()}>
        Log Out
      </button>
    </div>
  );
}
