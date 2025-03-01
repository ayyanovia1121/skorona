import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  const {isAuthenticated} = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto">
            Unlock the power of your tasks and projects with{" "}
            <span className="text-amber-700 font-bold">Skorona</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay organized, meet deadlines, and supercharge your productivity
            with Skorona's intuitive task management
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            {isLoggedIn ? (
              <>
              <Button> 
                <Link href="/workspace">Workspace</Link>
              </Button>
              </>
            ) : (
              <>
                <Button >
                  <RegisterLink>Get Started</RegisterLink>
                </Button>
                <Button variant={"outline"}>
                  <LoginLink>Sign In</LoginLink>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
