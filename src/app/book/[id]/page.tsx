// app/book/page.tsx
"use server";
import {
  getBookingById,
  getBookingParticipants,
  getPlaceById,
} from "@/lib/bookdb";
import { Booking, Place } from "@models/bookings";
import BookingInfoComponent from "./booking";
import { cookies } from "next/headers";
import { Payload } from "@models/authmodel";
import { redirect } from "next/navigation";
// This is the server-side handler, no useState here
export default async function BookingInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  let booking: Booking | undefined = undefined;
  try {
    booking = await getBookingById(id);
    if (!booking) {
      redirect("/");
    }
  } catch (error) {
    console.error("Error fetching booking:", error);
    redirect("/");
  }

  let payload: Payload | undefined = undefined;
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("payload")?.value;
  if (cookieValue) {
    payload = JSON.parse(cookieValue);
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

  let members: any[] = [];
  let booking_participants: number = 0;
  let isUserParticipant: boolean = false;

  if (booking.id) {
    members = await getBookingParticipants(booking.id);
    booking_participants = members.length;
    isUserParticipant =
      payload && payload.id
        ? members.some((member) => member.user_id === payload.id)
        : false;
  }

  return (
    <div className="center-flex h-screen w-screen">
      <BookingInfoComponent
        place={place}
        booking={booking}
        payload={payload}
        booking_participants={booking_participants}
        isUserParticipant={isUserParticipant}
      />
    </div>
  );
}
