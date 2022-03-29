import { EcosystemEnum } from "../src/enums/EcosystemEnum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  await prisma.$connect();
  await Promise.all([seedNpm(), seedPython()]);
  await prisma.$disconnect();
};

const seedNpm = async () => {
  const ecosystem = await prisma.ecosystem.create({
    data: {
      name: EcosystemEnum.NPM,
    },
  });
  const ecosystemId: number = ecosystem.id;
  const techs = await prisma.tech.createMany({
    data: [
      {
        name: "React",
        packageName: "react",
        website: "https://reactjs.org/",
        ecosystemId,
      },
      {
        name: "Next.js",
        packageName: "next",
        website: "https://nextjs.org/",
        ecosystemId,
      },
      {
        name: "SWR",
        packageName: "swr",
        website: "https://swr.vercel.app/",
        ecosystemId,
      },
    ],
  });

  await prisma.techPair.createMany({
    data: [
      {
        techHeadId: techs[1].id,
        techTailId: techs[0].id,
      },
      {
        techHeadId: techs[1].id,
        techTailId: techs[2].id,
      },
    ],
  });
};

const seedPython = async () => {
  await prisma.ecosystem.create({
    data: {
      name: EcosystemEnum.Python,
    },
  });
};

main().then();
