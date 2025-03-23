"use server";

import { Booking } from "@models/bookings";

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

export async function CreateBooking(booking: Booking) {
  try {
    console.log("Creating booking:", booking);

    return await prisma.bookings.create({
      data: {
        date: booking.date,
        players: booking.players,
        user_id: booking.user_id,
        place_id: booking.place_id,
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}
