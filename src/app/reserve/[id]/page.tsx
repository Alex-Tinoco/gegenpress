// app/book/page.tsx
"use server";
import { getPlaceById, getReservationById } from "@/lib/bookdb";
import { Place } from "@models/bookings";
import { cookies } from "next/headers";
import { Payload } from "@models/authmodel";
import { Reservation } from "@models/reservation";
import ReservationInfoComponent from "./reservation";
// This is the server-side handler, no useState here
export default async function ReservationInfoPage({
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

  let reservation: Reservation | undefined = undefined;
  try {
    const { id } = params;
    reservation = await getReservationById(id);
  } catch (error) {
    console.error("Error fetching reservation:", error);
  }

  if (!reservation) {
    return new Response("Reservation not found", { status: 404 });
  }

  let place: Place | undefined = undefined;
  try {
    place = await getPlaceById(reservation.place_id);
  } catch (error) {
    console.error("Error fetching place:", error);
  }

  return (
    <div className="center-flex h-screen w-screen">
      <ReservationInfoComponent
        place={place}
        reservation={reservation}
        payload={payload}
      />
    </div>
  );
}
