import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">
        Unlock Your Potential with Skorona
      </h1>
      <div className="flex gap-4 mt-6">
        <Button >
          <RegisterLink>Get Started</RegisterLink>
        </Button>
        <Button variant={"outline"} >
          <LoginLink>Sign In</LoginLink>
        </Button>
      </div>
    </div>
  );
}
