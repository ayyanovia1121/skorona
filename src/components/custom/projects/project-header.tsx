import { ProjectProps } from '@/types'
import ProjectAvatar from './project-avatar'
import CreateTaskDialog from '../task/create-task-dialog';


const ProjectHeader = ({project}:{project:ProjectProps}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex gap-2">
          <ProjectAvatar name={project.name} />

          <div>
            <h1 className="text-xl 2xl:text-2xl font-bold">{project?.name}</h1>

            {project?.description && (
              <p className="text-sm  2xl:text-lg text-muted-foreground">
                {project?.description}
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-end mt-3 md:mt-0 gap-3'>
            <CreateTaskDialog project={project}/>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader