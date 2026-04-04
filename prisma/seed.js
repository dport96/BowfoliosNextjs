const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, '../src/private/data.json');
  const { profiles, projects } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log('Clearing database...');
  await prisma.profileInterest.deleteMany();
  await prisma.profileProject.deleteMany();
  await prisma.projectInterest.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding Interests...');
  const allInterestNames = new Set([
    ...profiles.flatMap(p => p.interests),
    ...projects.flatMap(p => p.interests)
  ]);
  
  for (const name of allInterestNames) {
    await prisma.interest.create({ data: { name } });
  }

  console.log('Seeding Projects...');
  for (const p of projects) {
    const project = await prisma.project.create({
      data: {
        name: p.name,
        homepage: p.homepage,
        description: p.description,
        picture: p.picture,
      }
    });

    for (const interestName of p.interests) {
      const interest = await prisma.interest.findUnique({ where: { name: interestName } });
      await prisma.projectInterest.create({
        data: { projectId: project.id, interestId: interest.id }
      });
    }
  }

  console.log('Seeding Profiles & Users...');
  for (const p of profiles) {
    const profile = await prisma.profile.create({
      data: {
        email: p.email,
        firstName: p.firstName,
        lastName: p.lastName,
        bio: p.bio,
        title: p.title,
        picture: p.picture,
      }
    });

    await prisma.user.create({
      data: { email: p.email, password: 'foo', role: p.role || 'user' }
    });

    for (const interestName of p.interests) {
      const interest = await prisma.interest.findUnique({ where: { name: interestName } });
      await prisma.profileInterest.create({
        data: { profileId: profile.id, interestId: interest.id }
      });
    }

    for (const projectName of p.projects) {
      const project = await prisma.project.findUnique({ where: { name: projectName } });
      if (project) {
        await prisma.profileProject.create({
          data: { profileId: profile.id, projectId: project.id }
        });
      }
    }
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
