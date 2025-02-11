import { CubeTransparentIcon } from "@heroicons/react/24/solid";

export default function HeroImage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-t from-indigo-100 to-indigo-50 font-semibold">
      <CubeTransparentIcon className="h-32 w-32 text-indigo-300" />
      <h1 className="text-4xl text-indigo-500">
        Welcome to <span className="font-extrabold">Hinqo Games</span>
      </h1>
      <p className="w-2/3 text-center text-xl whitespace-normal text-indigo-400">
        Dive into exciting games and explore unique projects. Join the adventure
        and see what's next!
      </p>
    </div>
  );
}
