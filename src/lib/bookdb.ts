"use server";

import { Booking } from "@models/bookings";
import { Reservation } from "@models/reservation";

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

export async function getBookingParticipants(id: string): Promise<any[]> {
  try {
    return await prisma.bookings_participants.findMany({
      where: {
        booking_id: id,
      },
    });
  } catch (error) {
    console.error("Error fetching booking participants:", error);
    throw error;
  }
}

export async function joinBooking(id: string, user_id: string) {
  try {
    return await prisma.bookings_participants.create({
      data: {
        booking_id: id,
        user_id: user_id,
      },
    });
  } catch (error) {
    console.error("Error joining booking:", error);
    throw error;
  }
}

//////////////////// RESERVATION

export async function sessionReservation(reservation: Reservation) {
  try {
    console.log("Creating reservation:", reservation);

    return await prisma.coaching_sessions.create({
      data: {
        date: reservation.date,
        duration: reservation.duration,
        description: reservation.description,
        max_players: reservation.max_players,
        place_id: reservation.place_id,
        user_id: reservation.user_id,
      },
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}

export async function getReservationById(id: string) {
  try {
    return await prisma.coaching_sessions.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
}

export async function getUsersReservations(user_id: string) {
  try {
    return await prisma.coaching_sessions.findMany({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
}

export async function deleteReservation(id: string) {
  try {
    return await prisma.coaching_sessions.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
}

export async function joinReservation(id: string, user_id: string) {
  try {
    return await prisma.session_participants.create({
      data: {
        session_id: id,
        user_id: user_id,
      },
    });
  } catch (error) {
    console.error("Error joining reservation:", error);
    throw error;
  }
}

export async function getReservationParticipants(id: string) {
  try {
    return await prisma.session_participants.findMany({
      where: {
        session_id: id,
      },
    });
  } catch (error) {
    console.error("Error fetching reservation participants:", error);
    throw error;
  }
}
