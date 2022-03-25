-- CreateTable
CREATE TABLE "Ecosystem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ecosystem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ecosystem_name_key" ON "Ecosystem"("name");
