"use server";
import { cookies } from "next/headers";
import { getAllPlaces } from "@/lib/bookdb";
import { Place } from "@models/bookings";
import { Payload } from "@models/authmodel";
import { NextResponse } from "next/server";
import ReserveComponent from "./reserve";

export default async function ReservePage(req: Request) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("payload")?.value;

  if (!cookieValue) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const parsedPayload: Payload = JSON.parse(cookieValue);

  let places: Place[] = [];
  try {
    places = await getAllPlaces();
  } catch (error) {
    console.error("Error fetching places:", error);
  }

  return (
    <div>
      <ReserveComponent payload={parsedPayload} places={places} />
    </div>
  );
}
