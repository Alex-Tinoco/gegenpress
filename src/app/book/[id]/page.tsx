// app/book/page.tsx
"use server";
import { getBookingById, getPlaceById } from "@/lib/bookdb";
import { Booking, Place } from "@models/bookings";
import BookingInfoComponent from "./booking";
import { cookies } from "next/headers";
import { Payload } from "@models/authmodel";
// This is the server-side handler, no useState here
export default async function BookingInfoPage({
  params,
}: {
  params: { id: string };
}) {
  let payload: Payload | undefined = undefined;
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("payload")?.value;
  if (cookieValue) {
    payload = JSON.parse(cookieValue);
  }

  let booking: Booking | undefined = undefined;
  try {
    const { id } = await params;
    booking = await getBookingById(id);
  } catch (error) {
    console.error("Error fetching booking:", error);
  }

  if (!booking) {
    return new Response("Booking not found", { status: 404 });
  }

  let place: Place | undefined = undefined;
  try {
    place = await getPlaceById(booking.place_id);
  } catch (error) {
    console.error("Error fetching place:", error);
  }

  return (
    <div className="center-flex h-screen w-screen">
      <BookingInfoComponent place={place} booking={booking} payload={payload} />
    </div>
  );
}
