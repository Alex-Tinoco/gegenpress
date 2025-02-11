const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Account } from "@models/authmodel";
import bcrypt from "bcrypt";

type PrismaTransactionClient = Omit<
  typeof PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export async function createAccount(data: Account) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  await prisma.$transaction(async (prisma: PrismaTransactionClient) => {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        oldPasswords: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  });
}
