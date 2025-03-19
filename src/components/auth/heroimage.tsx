import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import { IoFootballOutline } from "react-icons/io5";

export default function HeroImage() {
  return (
    <div className="h-full w-full bg-[url(/places_images/bg.jpg)] bg-cover">
      <div className="light from-dark/100 to-dark/50 bg-op flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-t font-semibold">
        <IoFootballOutline className="text-light h-32 w-32" />
        <h1 className="flex flex-row gap-2 px-5 text-center text-4xl shadow-xl">
          <span className="text-light font-extrabold">
            Welcome to{" "}
            <span className="text-main font-galada inline">Gegen</span>
            <span className="font-galada text-secondary">Press</span>
          </span>
        </h1>
        <p className="text-light w-2/3 text-center text-xl whitespace-normal">
          Whether it's a friendly match or a quick training session, securing a
          pitch for your game has never been easier. <br />
          Get ready to play whenever you want!
        </p>
      </div>
    </div>
  );
}
