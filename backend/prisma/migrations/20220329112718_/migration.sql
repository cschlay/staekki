-- CreateTable
CREATE TABLE "Ecosystem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ecosystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "ecosystemId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tech" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "packageName" TEXT,
    "website" TEXT,
    "ecosystemId" INTEGER NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechOnProject" (
    "techId" INTEGER NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "TechOnProject_pkey" PRIMARY KEY ("techId","projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ecosystem_name_key" ON "Ecosystem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_ecosystemId_key" ON "Tech"("name", "ecosystemId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ecosystemId_fkey" FOREIGN KEY ("ecosystemId") REFERENCES "Ecosystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_ecosystemId_fkey" FOREIGN KEY ("ecosystemId") REFERENCES "Ecosystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechOnProject" ADD CONSTRAINT "TechOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechOnProject" ADD CONSTRAINT "TechOnProject_techId_fkey" FOREIGN KEY ("techId") REFERENCES "Tech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
