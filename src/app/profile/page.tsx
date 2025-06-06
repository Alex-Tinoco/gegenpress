// app/book/page.tsx
"use server";
import { cookies } from "next/headers"; // Import cookies from next/headers
import ProfileComponent from "./profile"; // Client-side component (book)
import {
  getAllPlaces,
  getUserBookings,
  getUsersReservations,
} from "@/lib/bookdb";
import { Place } from "@models/bookings";
import { Payload } from "@models/authmodel";
import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/account";

export default async function ProfilePage(req: Request) {
  //payload get
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("payload")?.value;

  if (!cookieValue) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  const payload: Payload = JSON.parse(cookieValue);

  const userInfo = await findUserByEmail(payload.email);
  const bookings = await getUserBookings(payload.id);
  const reservations = await getUsersReservations(payload.id);

  let places: Place[] = [];
  try {
    places = await getAllPlaces();
  } catch (error) {
    console.error("Error fetching places:", error);
  }

  return (
    <div className="flex h-screen w-screen bg-[url(/backgrounds/bgstadium2.jpg)] bg-cover">
      <div className="h-full w-full bg-black/5 backdrop-blur-xs">
        <ProfileComponent
          payload={payload}
          userInfo={userInfo}
          bookings={bookings}
          reservations={reservations}
          places={places}
        />
      </div>
    </div>
  );
}
