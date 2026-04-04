import React from 'react';
import { prisma } from '@/lib/prisma';
import ProjectsClient from '@/components/ProjectsClient';

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany({
    include: {
      interests: {
        include: {
          interest: true,
        },
      },
      profiles: {
        include: {
          profile: true,
        },
      },
    },
  });

  return <ProjectsClient projects={projects} />;
};

export default ProjectsPage;
