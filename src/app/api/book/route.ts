import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@models/bookings";
import { CreateBooking } from "@/lib/bookdb";

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json();
    console.log("Received booking data:", bookingData);

    // Ensure all required fields are present
    if (
      !bookingData.date ||
      !bookingData.players ||
      !bookingData.user_id ||
      !bookingData.place_id
    ) {
      console.error("Missing required booking fields:", bookingData);
      return NextResponse.json(
        { success: false, message: "Missing required booking fields" },
        { status: 400 },
      );
    }

    const booking: Booking = {
      date: new Date(bookingData.date),
      players: bookingData.players,
      user_id: bookingData.user_id,
      place_id: bookingData.place_id,
    };

    console.log("Prepared booking object:", booking);
    const result = await CreateBooking(booking);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Booking creation error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create booking" },
      { status: 500 },
    );
  }
}
