import React from 'react'

export interface Activity {
    id: string;
    type: string;
    description: string;
    createdAt: Date;
    user: {
      name: string;
      image: string | null;
    };
}

interface ActivityFeedProps {
    activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return <div className='space-y-4'>
    {activities.map((activity) => (
      <div key={activity.id} className='flex items-start gap-4'>
        <Project
      </div>
    ))}
  </div>;
};

export default ActivityFeed