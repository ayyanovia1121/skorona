"use client";

import { Column, ProjectTaskProps } from "@/types";
import { $Enums, TaskStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { taskStatusVariant } from "@/constants";
import { Separator } from "@/components/ui/separator";
import ProjectCard from "./project-card";

const COLUMN_TITLES: Record<$Enums.TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  BLOCKED: "Blocked",
  BACKLOG: "Backlog",
  IN_REVIEW: "In Review",
};

const ProjectKanban = ({
  initialTask,
}: {
  initialTask: ProjectTaskProps[];
}) => {
  //   const router = useRouter();

  if (initialTask.length === 0) return null;

  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const initialColumns: Column[] = Object.entries(COLUMN_TITLES).map(
      ([status, title]) => ({
        id: status as TaskStatus,
        title,
        tasks: initialTask
          .filter((task) => task.status === status)
          .sort((a, b) => a.position - b.position),
      })
    );

    setColumns(initialColumns);
  }, [initialTask]);

  const onDragEnd = () => {};

  return (
    <div className="flex gap-4 h-full md:px-4 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col min-w-60 w-80 bg-gray-50 dark:bg-gray-900"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-4 pl-3">
                <div
                  className={cn("size-4 rounded ")}
                  style={{
                    backgroundColor: taskStatusVariant[column.id as TaskStatus],
                  }}
                />
                <h2 className="font-semibold">{column.title}</h2>
              </div>
            </div>

            <Separator className="mb-2" />

            {/* Tasks */}
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div 
                {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 rounded-lg p-2">
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <ProjectCard
                          ref={provided.innerRef}
                          provided={provided}
                          task={task}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default ProjectKanban;
