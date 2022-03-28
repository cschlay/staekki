import { EcosystemEnum } from "../src/enums/EcosystemEnum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  await prisma.$connect();
  await Promise.all([seedNpm(), seedPython()]);
  await prisma.$disconnect();
};

const seedNpm = async () => {
  await prisma.ecosystem.create({
    data: {
      name: EcosystemEnum.NPM,
    },
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
