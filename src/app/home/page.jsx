import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import ProfileForm from '@/components/ProfileForm';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  const email = session.user.email;
  const profile = await prisma.profile.findUnique({ where: { email } });
  
  const profileInterests = await prisma.profileInterest.findMany({
    where: { profileId: profile.id },
    include: { interest: true },
  });
  const interests = profileInterests.map(i => i.interest.name);

  const profileProjects = await prisma.profileProject.findMany({
    where: { profileId: profile.id },
    include: { project: true },
  });
  const projects = profileProjects.map(p => p.project.name);
  
  const allInterests = (await prisma.interest.findMany()).map(i => i.name);
  const allProjects = (await prisma.project.findMany()).map(p => p.name);

  return (
    <ProfileForm 
      model={{ ...profile, interests, projects }} 
      allInterests={allInterests} 
      allProjects={allProjects} 
    />
  );
};

export default HomePage;
