import { ProjectProps } from '@/types'
import ProjectAvatar from './project-avatar'


const ProjectHeader = (project:ProjectProps) => {
  return (
    <div className='space-y-4'>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex gap-2">
                <ProjectAvatar  name={project.name}/>
            </div>
        </div>
    </div>
  )
}

export default ProjectHeader