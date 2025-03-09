import { Checkbox } from "@/components/ui/checkbox";
import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
        onCheckedChange={value =>table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
  },
];
