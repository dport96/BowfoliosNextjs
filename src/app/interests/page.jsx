import React from 'react';
import { prisma } from '@/lib/prisma';
import InterestsClient from '@/components/InterestsClient';

const InterestsPage = async () => {
  const interests = await prisma.interest.findMany({
    include: {
      profiles: {
        include: {
          profile: true,
        },
      },
      projects: {
        include: {
          project: true,
        },
      },
    },
  });

  return <InterestsClient interests={interests} />;
};

export default InterestsPage;
