import { CubeTransparentIcon } from "@heroicons/react/24/solid";

export default function HeroImage() {
  return (
    <div className="bg-[url(/places_images/bg.jpg)] w-full h-full bg-cover">
      <div className="light flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-t from-dark/90 to-dark/50 font-semibold bg-op">
      <CubeTransparentIcon className="h-32 w-32 text-light" />
      <h1 className="text-light px-5 text-center text-4xl flex flex-row gap-2 shadow-xl">
        Welcome to <strong className="font-extrabold"><p className="text-light inline">&nbsp;Gegen</p> Press</strong>
      </h1>
      <p className="w-2/3 text-center text-xl whitespace-normal text-light">
        Dive into exciting games and explore unique projects. Join the adventure
        and see what's next!
      </p>
      </div>
    </div>
  );
}
