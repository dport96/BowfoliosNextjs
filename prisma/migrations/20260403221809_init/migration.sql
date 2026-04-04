-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileInterest" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "ProfileInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileProject" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProfileProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInterest" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "ProjectInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "Interest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileInterest_profileId_interestId_key" ON "ProfileInterest"("profileId", "interestId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileProject_profileId_projectId_key" ON "ProfileProject"("profileId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInterest_projectId_interestId_key" ON "ProjectInterest"("projectId", "interestId");

-- AddForeignKey
ALTER TABLE "ProfileInterest" ADD CONSTRAINT "ProfileInterest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterest" ADD CONSTRAINT "ProfileInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileProject" ADD CONSTRAINT "ProfileProject_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileProject" ADD CONSTRAINT "ProfileProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInterest" ADD CONSTRAINT "ProjectInterest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInterest" ADD CONSTRAINT "ProjectInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
