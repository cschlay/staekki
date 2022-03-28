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
      name: "NPM",
    },
  });
};

const seedPython = async () => {
  await prisma.ecosystem.create({
    data: {
      name: "Python",
    },
  });
};

main().then();
