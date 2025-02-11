import { EyeDropperIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">Get Started</h1>

      <div className="flex w-1/3 flex-col items-center justify-center gap-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-2 hover:bg-gray-100">
          <img src="/icons/google.png" className="h-6" alt="Google Logo" />
          Sign in with Google
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-md border-1 border-gray-300 py-2 hover:bg-gray-100">
          <img src="/icons/apple_black.png" className="h-6" alt="Google Logo" />
          Sign in with Apple
        </button>
      </div>

      <div className="flex w-1/3 flex-row gap-3">
        <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
        <span className="mx-1 flex-shrink text-gray-400">OR</span>
        <div className="flex-grow -translate-y-2.5 border-b-1 border-gray-400"></div>
      </div>

      <form className="flex w-1/3 flex-col gap-3">
        <label className="translate-x-1 text-sm">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border-1 border-gray-300 px-4 py-2 text-sm"
        />

        <label className="translate-x-1 text-sm">Password</label>
        <div className="flex h-full flex-row items-center justify-center gap-1">
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-md border-1 border-gray-300 px-4 py-2 text-sm focus:border-gray-100"
          />
          <EyeIcon className="h-9 rounded-md border-1 border-gray-300 p-1 text-gray-300" />
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-md border-2 bg-indigo-500 py-2 text-white hover:bg-indigo-600">
          Sign in or create account
        </button>
      </form>
    </div>
  );
}
