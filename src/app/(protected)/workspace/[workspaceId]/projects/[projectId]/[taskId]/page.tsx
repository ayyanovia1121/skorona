import TaskDetails from '@/components/custom/task/task-details'
import { userRequired } from '@/utils/auth/user/user-auth'
import { getTaskById } from '@/utils/data/task/get-task-by-id'
import { redirect } from 'next/navigation'
import React from 'react'

interface PageProps {
    params: Promise<{
        taskId: string,
        workspaceId: string,
        projectId: string
    }>
}

const TaskDetailPage = async({params}: PageProps) => {
    await userRequired();

    const {taskId, workspaceId, projectId} = await params;
    const {task, comments} = await getTaskById(taskId, workspaceId, projectId);

    if(!task) redirect("/not-found");

  return (
    <div className='flex flex-col lg:flex-row gap-6 md:px-6 pb-6'>
        <div className="flex-1">
            <TaskDetails task={task} />
        </div>
        <div className="w-full lg:w-[400px]">

        </div>
    </div>
  )
}

export default TaskDetailPage