'use client'
import { File, Project, Task, User } from '@prisma/client'
import React from 'react'
import { DataTable } from '../datatable/data-table';
import { columns, myTaskColumns } from './column';

export interface TaskProps extends Task {
    assignedTo: User;
    project: Project;
    attachments: File[];
}

const ProjectTable = ({tasks} : {tasks: TaskProps[]}) => {
  return (
    <DataTable columns={columns} data={tasks as any} />
  )
}

export default ProjectTable

export const MyTasksTable = ({tasks} : {tasks: TaskProps[]}) => {
  return (
    <DataTable columns={myTaskColumns} data={tasks as any} />
  )
}

