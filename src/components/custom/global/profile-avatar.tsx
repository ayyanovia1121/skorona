import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ProfileAvatar = ({
    url,
    name,
    size = "md",
    className,
    numOfChars = 1
}: {
    name: string;
    url?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
    numOfChars?: number;
}) => {
  return (
    <Avatar className={cn(
        "h-8 w-8 rounded-md",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-10 w-10",
        className
    )}>
        <AvatarImage src={url || undefined} alt={name} />

        <AvatarFallback className="bg-amber-600 text-base text-white rounded-md">
            {name.substring(0, numOfChars).toUpperCase()}
        </AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar