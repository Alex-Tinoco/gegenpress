const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { name: "Alice", email: "alice@example.com" },
  });
  console.log("User created:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
