import React from "react";

interface ProjectPageProps {
  params: Promise<{ workspaceId: string; projectId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const ProjectPage = async(props: ProjectPageProps) => {
    const { workspaceId, projectId } = await props.params;
    const searchParams = await props.searchParams;
    
  return <div>ProjectByIdPage</div>;
};

export default ProjectPage;
