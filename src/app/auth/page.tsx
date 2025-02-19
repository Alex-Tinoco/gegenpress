import Login from "@/components/auth/Login";
import HeroImage from "@/components/auth/HeroImage";

export default function AuthenticationPage() {
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="w-full md:w-1/2">
        <Login />
      </div>
      <div className="hidden md:flex md:w-1/2">
        <HeroImage />
      </div>
    </div>
  );
}
