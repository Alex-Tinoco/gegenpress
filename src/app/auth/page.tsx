import Login from "@/components/auth/login";
import HeroImage from "@/components/auth/heroimage";

export default async function AuthenticationPage() {
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="w-1/2">
        <Login />
      </div>
      <div className="w-1/2">
        <HeroImage />
      </div>
    </div>
  );
}
