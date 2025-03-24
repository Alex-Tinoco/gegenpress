const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Account } from "@models/authmodel";
const bcrypt = require("bcryptjs");

type PrismaTransactionClient = Omit<
  typeof PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export async function createAccount(data: Account) {
  await prisma.$transaction(async (prisma: PrismaTransactionClient) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id: string) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
}

export async function retrievePassword(id: string) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      password: {
        select: {
          hash: true,
        },
      },
    },
  });
}

export async function editUserData(id: string, data: Account) {
  return await prisma.users.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAccount(id: string) {
  return await prisma.users.delete({
    where: {
      id,
    },
  });
}
