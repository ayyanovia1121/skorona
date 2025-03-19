"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { workspaceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Workspace } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateWorkspaceDataType } from "./create-workspace-form";
import { toast } from "sonner";
import { updateWorkspace } from "@/action/workspace";

interface DataProps extends Workspace {
  members: {
    userId: string;
    accessLevel: $Enums.AccessLevel;
  }[];
}

const WorkspaceSettingsForm = ({ data }: { data: DataProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
//   const { isOpen, handleConfirm, handleCancel, confirmationOptions } =
  const [inviteEmail, setInviteEmail] = useState(false);

  const form = useForm<CreateWorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: data.name,
      description: data.description || "",
    },
  });

  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/workspace-invite/${data.id}/join/${data.inviteCode}`;

  const handleOnSubmit = async(values: CreateWorkspaceDataType) => {
     try {
        setIsPending(true);
        await updateWorkspace(data.id, values);

        toast.success("Workspace updated successfully.");
        router.refresh();
     } catch (error) {
        if(error instanceof Error && error.message !== "NEXT_REDIRECT") {
           toast.error(
            error instanceof Error ? error.message : "Something went wrong. Please try again."
           );
        }
     }finally {
        setIsPending(false);
     }
  }
  return (
    <div className="p-3 md:p-6 max-w-4xl w-full mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
          <CardDescription>
            Manage your workspace settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your workspace name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a bit about your workspace"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-end">
                <Button type="submit" disabled={isPending}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceSettingsForm;
