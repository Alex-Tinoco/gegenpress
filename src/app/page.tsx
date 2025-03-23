"use client";

import Link from "next/link";

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
    <div className="flex flex-col lg:flex-row">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl [text-shadow:_0_1px_10px_rgb(0_0_0)]">
        <span className="text-main font-galada inline">Gegen</span>
        <span className="font-galada text-secondary">Press</span>
      </div>

      <div className="center-flex h-1/2 w-full border-1 border-black bg-[url(/backgrounds/homebg-player.jpg)] bg-cover shadow-2xl lg:h-screen lg:w-1/2">
        <div className="center-flex h-full w-full flex-col gap-10 bg-gradient-to-l from-black via-black/70 via-30% to-black/30 transition-colors duration-300 hover:via-black/10">
          {/* <button className="btn btn-secondary" onClick={() => LogOut()}>
            Log Out
          </button> */}
          <div className="[text-shadow:_0_1px_10px_rgb(0_0_0)]">
            <h1 className="mt-40 text-5xl font-bold text-white lg:mt-80">
              Looking for a field to Play?
            </h1>
            <p className="text-light mt-2 text-center text-lg">
              Find a field and enjoy a game with your team.
            </p>
          </div>
          <Link href="/book">
            <button className="btn btn-primary bg-main hover:bg-main-darker border-0">
              Book your session
            </button>
          </Link>
        </div>
      </div>
      <div className="center-flex h-1/2 w-screen bg-[url(/backgrounds/homebg-coach.jpg)] bg-cover lg:h-screen lg:w-1/2">
        <div className="center-flex h-full w-full flex-col gap-10 bg-gradient-to-r from-black via-black/70 via-30% to-black/30 transition-colors duration-300 hover:via-black/10">
          <div className="[text-shadow:_0_1px_10px_rgb(0_0_0)]">
            <h1 className="mt-40 text-5xl font-bold text-white lg:mt-80">
              Need a Field for Your Team?
            </h1>
            <p className="text-light mt-2 text-center text-lg">
              Reserve the perfect space for your next training session.
            </p>
          </div>
          <Link href="/reserve">
            <button className="btn btn-primary bg-main hover:bg-main-darker border-0">
              Reserve a Field
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 m-2 text-xs text-gray-600 underline">
        <a
          href="https://www.instagram.com/brfootball/p/CdDyGAgMRwO/"
          target="_blank"
        >
          Image source
        </a>
      </div>
      <div className="absolute right-0 bottom-0 m-2 text-xs text-gray-600 underline">
        <a href="https://turfhit.com/services/" target="_blank">
          Image source
        </a>
      </div>
    </div>
  );
}
