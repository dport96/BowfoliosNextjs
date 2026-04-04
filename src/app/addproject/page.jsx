import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import AddProjectForm from '@/components/AddProjectForm';

const AddProjectPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  const allInterests = (await prisma.interest.findMany()).map(i => i.name);
  const allProfiles = (await prisma.profile.findMany()).map(p => p.email);

  return <AddProjectForm allInterests={allInterests} allProfiles={allProfiles} />;
};

export default AddProjectPage;
