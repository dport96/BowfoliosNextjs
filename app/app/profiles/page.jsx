import React from 'react';
import { prisma } from '@/lib/prisma';
import ProfilesClient from '@/components/ProfilesClient';

const ProfilesPage = async () => {
  const profiles = await prisma.profile.findMany({
    include: {
      interests: {
        include: {
          interest: true,
        },
      },
      projects: {
        include: {
          project: true,
        },
      },
    },
  });

  return <ProfilesClient profiles={profiles} />;
};

export default ProfilesPage;
