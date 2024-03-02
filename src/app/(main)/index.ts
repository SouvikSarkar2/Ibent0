import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  const event = await prisma.user.findMany();
  console.log("events :", event);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
