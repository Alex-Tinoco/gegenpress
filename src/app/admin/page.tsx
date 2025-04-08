// app/admin/page.tsx
"use server";
import { cookies } from "next/headers";
import { Payload } from "@models/authmodel";
import AdminDashboardComponent from "./admin";
import { getAllBookings, getAllPlaces } from "@/lib/bookdb";

export default async function AdminPage() {
  // Get user from cookies
  let payload: Payload | undefined = undefined;
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("payload")?.value;

  if (cookieValue) {
    payload = JSON.parse(cookieValue);
  }

  let places = [];
  try {
    places = await getAllPlaces();
  } catch (error) {
    console.error("Error fetching places:", error);
  }

  let bookings = [];
  try {
    bookings = await getAllBookings();
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  const placesBookings: { [key: string]: any } = {};

  for (const place of places) {
    placesBookings[place.id] = {
      id: place.id,
      bookingCount: 0,
    };
  }

  for (const booking of bookings) {
    if (placesBookings[booking.place_id]) {
      placesBookings[booking.place_id].bookingCount++;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboardComponent
        placesBookings={placesBookings}
        bookings={bookings}
        payload={payload}
        places={places}
      />
    </div>
  );
}
