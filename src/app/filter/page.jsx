import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import FilterProfiles from '@/components/FilterProfiles';

const FilterPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  const allInterests = (await prisma.interest.findMany()).map(i => i.name);
  const initialProfiles = await prisma.profile.findMany({
    include: {
      interests: { include: { interest: true } },
      projects: { include: { project: true } },
    },
  });

  // Transform data to match UI expectations
  const transformedProfiles = initialProfiles.map(p => ({
    ...p,
    interests: p.interests.map(i => i.interest.name),
    projects: p.projects.map(pj => pj.project.picture),
  }));

  return <FilterProfiles allInterests={allInterests} initialProfiles={transformedProfiles} />;
};

export default FilterPage;
