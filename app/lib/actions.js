'use server';

import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from './prisma';

export async function updateProfile(data) {
  console.log('Action: updateProfile started', data);
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error('Action: updateProfile - Not authorized');
    throw new Error('Not authorized');
  }

  const { email, firstName, lastName, bio, title, picture, interests, projects } = data;

  try {
    const profile = await prisma.profile.upsert({
      where: { email },
      update: { firstName, lastName, bio, title, picture },
      create: { email, firstName, lastName, bio, title, picture },
    });
    console.log('Action: updateProfile - Profile upserted', profile.id);

    // Sync Interests
    await prisma.profileInterest.deleteMany({ where: { profileId: profile.id } });
    if (interests) {
      await Promise.all(interests.map(async (interestName) => {
        const interest = await prisma.interest.findUnique({ where: { name: interestName } });
        if (interest) {
          await prisma.profileInterest.create({ data: { profileId: profile.id, interestId: interest.id } });
        }
      }));
    }

    // Sync Projects
    await prisma.profileProject.deleteMany({ where: { profileId: profile.id } });
    if (projects) {
      await Promise.all(projects.map(async (projectName) => {
        const project = await prisma.project.findUnique({ where: { name: projectName } });
        if (project) {
          await prisma.profileProject.create({ data: { profileId: profile.id, projectId: project.id } });
        }
      }));
    }

    revalidatePath('/profiles');
    revalidatePath('/home');
    console.log('Action: updateProfile completed');
  } catch (error) {
    console.error('Action: updateProfile error', error);
    throw error;
  }
}

export async function addProjectAction(data) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Not authorized');

  const { name, description, picture, homepage, interests, participants } = data;

  const project = await prisma.project.create({
    data: { name, description, picture, homepage },
  });

  if (interests) {
    await Promise.all(interests.map(async (interestName) => {
      const interest = await prisma.interest.findUnique({ where: { name: interestName } });
      if (interest) {
        await prisma.projectInterest.create({ data: { projectId: project.id, interestId: interest.id } });
      }
    }));
  }

  if (participants) {
    await Promise.all(participants.map(async (participantEmail) => {
      const profile = await prisma.profile.findUnique({ where: { email: participantEmail } });
      if (profile) {
        await prisma.profileProject.create({ data: { profileId: profile.id, projectId: project.id } });
      }
    }));
  }

  revalidatePath('/projects');
}
