"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { projectSchema } from "@/schema";
import { workspaceMemberProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  workspaceMembers: workspaceMemberProps[];
}

type ProjectDataType = z.infer<typeof projectSchema>;

const CreateProjectForm = ({ workspaceMembers }: Props) => {
  const workspaceId = useWorkspaceId();
  const [pending, setPending] = useState(false);
  const form = useForm<ProjectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      memberAccess: [],
      workspaceId: workspaceId as string,
    },
  });

  const handleSubmit = async (data: ProjectDataType) => {};
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} className="size-5">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Card className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your project name"
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
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about your project"
                          {...field}
                          className="resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <FormField
                    control={form.control}
                    name="memberAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Access</FormLabel>
                        <FormDescription>
                          Select which workspace members can access this
                          project.
                        </FormDescription>
                        <div>
                          {workspaceMembers.map((member) => (
                            <div
                              key={member.userId}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={member.userId}
                                checked={field.value?.includes(member.userId)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  if (checked) {
                                    field.onChange([
                                      ...currentValue,
                                      member.userId,
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter(
                                        (id) => id !== member.userId
                                      )
                                    );
                                  }
                                }}
                              />
                              <Label
                                htmlFor={member.userId}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                              >
                                {member.user.name}({""}
                                {member.accessLevel.toLowerCase()})
                              </Label>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-start gap-4">
                  <Button
                    variant={"destructive"}
                    type="button"
                    disabled={pending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={pending}>
                    Create
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProjectForm;
