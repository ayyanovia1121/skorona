import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import React from 'react'


const ProjectAvatar = ({
name,
className
}: {
name: string
className?: string
}) => {
  return (
    <Avatar className={cn("size-6 2xl:size-8 rounded-md items-center", className)}>
        <AvatarFallback className='w-6 2xl:w-8 h-6 2xl:h-8 bg-amber-600 text-base text-white rounded-md'>
            {name?.charAt(0).toUpperCase()}
        </AvatarFallback>
    </Avatar>
  )
}

export default ProjectAvatar