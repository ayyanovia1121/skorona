import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ProfileAvatar from "./global/profile-avatar";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string | null;
}
const Navbar = ({ id, name, email, image }: Props) => {
  return (
    <nav className="w-full flex items-center justify-between p-4">
      <div>
        <h1 className="font-bold text-2xl">Home</h1>
        <span className="text-sm text-muted-foreground">
          Manage your tasks and projects with ease
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <Bell />
        </Button>
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <ProfileAvatar name={name} url={image || undefined} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="mb-4">
              <h2>{name}</h2>
              <p>{email}</p>
            </div>
            <Button variant={"ghost"}>
              <LogoutLink>Sign Out</LogoutLink>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
