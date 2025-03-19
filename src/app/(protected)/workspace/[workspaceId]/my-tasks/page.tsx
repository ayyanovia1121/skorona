import { MyTasksTable, TaskProps } from '@/components/custom/projects/project-table';
import { userRequired } from '@/utils/auth/user/user-auth'
import { getMyTasks } from '@/utils/data/task/get-my-tasks';


const MyTasksPage = async() => {
   await userRequired();
   const tasks= await getMyTasks();
  return (
    <div>
      <MyTasksTable tasks={tasks as unknown as TaskProps[]}/>
    </div>
  )
}

export default MyTasksPage