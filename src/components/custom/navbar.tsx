import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ProfileAvatar from "./global/profile-avatar";
import { Separator } from "../ui/separator";

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
          <PopoverContent className="flex flex-col items-center gap-3">
            <div className="mb-4 w-full flex flex-col items-center justify-between">
              <h2 className="font-medium text-lg">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <Separator />
            <Button variant={"ghost"} className="w-full">
              <LogoutLink>Sign Out</LogoutLink>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
