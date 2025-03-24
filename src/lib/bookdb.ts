"use server";

import { Booking } from "@models/bookings";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

export async function getUserBookings(user_id: string) {
  try {
    return await prisma.bookings.findMany({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function deleteBooking(id: string) {
  try {
    return await prisma.bookings.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

export async function getBookingById(id: string) {
  try {
    return await prisma.bookings.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}

export async function getPlaceById(id: number) {
  try {
    return await prisma.places.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error;
  }
}
