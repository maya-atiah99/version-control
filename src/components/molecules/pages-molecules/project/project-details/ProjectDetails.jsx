import React from 'react';
import ProjectConfig from './project-config/ProjectConfig';
import ProjectData from './project-data/ProjectData';
const ProjectDetails = ({ data, activeTab }) => {
  return (
    <>
      <ProjectConfig data={data} />
      <ProjectData projectActiveTab={activeTab} />
    </>
  );
};

export default ProjectDetails;
