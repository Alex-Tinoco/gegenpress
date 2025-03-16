"use server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
}

export async function getAllPlaces() {
  try {
    return await prisma.places.findMany();
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}
