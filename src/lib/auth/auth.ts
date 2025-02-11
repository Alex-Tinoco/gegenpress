const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import { Account } from '@models/authmodel';

type PrismaTransactionClient = Omit<typeof PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">

export async function createUser(data: Account) {

const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.$transaction(async (prisma : PrismaTransactionClient) => {
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
    })
  });
}


let testobject: Account = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securepassword123',
  };
// Example usage
createUser(testobject)
  .then(() => {
    console.log('User created');
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
