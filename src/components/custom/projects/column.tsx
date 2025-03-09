import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EllipsisVertical, Paperclip } from "lucide-react";
import Link from "next/link";
import ProjectAvatar from "./project-avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ProfileAvatar from "../global/profile-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TaskTableItem = {
  id: string;
  name: string;
  status: string;
  dueDate: Date;
  assignedTo: {
    name: string;
    image?: string;
  };
  project: Project;
};

export const columns: ColumnDef<TaskTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select row`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task Title <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return (
        <Link
          href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
        >
          <div className="flex items-center gap-2">
            <ProjectAvatar name={title} />
            <span className="font-medium text-sm xl:text-base capitalize">
              {title}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant={status as any}>
          {status === "IN_PROGRESS" ? "In Progress" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;

      return (
        <Badge variant={"secondary"} className="font-normal">
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <div>{format(new Date(createdAt), "dd/MM/yyyy")}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as Date;
      return <div>{format(new Date(dueDate), "dd/MM/yyyy")}</div>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo") as {
        name: string;
        image?: string;
      };
      return (
        <div className="flex items-center gap-2">
          <ProfileAvatar
            name={assignedTo?.name || "unassigned"}
            url={assignedTo?.image}
          />
          <span>{assignedTo?.name || "unassigned"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "attachments",
    header: "Attachments",
    cell: ({ row }) => {
      const attachments = row.getValue("attachments") as string[];
      return (
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4" />
          {attachments?.length}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
                >
                  View Task
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
