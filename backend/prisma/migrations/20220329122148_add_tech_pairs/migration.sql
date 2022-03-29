-- CreateTable
CREATE TABLE "TechPair" (
    "id" SERIAL NOT NULL,
    "techTailId" INTEGER NOT NULL,
    "techHeadId" INTEGER NOT NULL,

    CONSTRAINT "TechPair_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechPair" ADD CONSTRAINT "TechPair_techTailId_fkey" FOREIGN KEY ("techTailId") REFERENCES "Tech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechPair" ADD CONSTRAINT "TechPair_techHeadId_fkey" FOREIGN KEY ("techHeadId") REFERENCES "Tech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
