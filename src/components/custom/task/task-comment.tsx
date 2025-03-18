"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useProjectId } from "@/hooks/use-project-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Comment, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CommentList from "../projects/comment-list";
import { toast } from "sonner";
import { postComment } from "@/action/project";

type CommentWithUser = Comment & {
  user: User;
};

interface TaskCommentsProps {
  taskId: string;
  comments: CommentWithUser[];
}

const TaskComment = ({ taskId, comments }: TaskCommentsProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const router = useRouter();

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      await postComment(workspaceId as string, projectId, newComment);
      toast.success("Comment posted successfully.");
      setNewComment("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[100px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <Button disabled={isSubmitting || !newComment.trim()} onClick={handleSubmit}>
            Post Comment
          </Button>
        </div>

        <CommentList comments={comments as any} />
      </CardContent>
    </Card>
  );
};

export default TaskComment;
