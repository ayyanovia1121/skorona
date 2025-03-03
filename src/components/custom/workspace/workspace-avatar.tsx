"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const WorkspaceAvatar = ({ name }: { name: string }) => {
  return (
    <Avatar className="size-6 2xl:size-8 rounded-md items-center">
      <AvatarFallback className="w-full h-full bg-amber-700 text-base text-white rounded-md">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
