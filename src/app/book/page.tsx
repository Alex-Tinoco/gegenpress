// app/book/page.tsx
"use server";
import { cookies } from "next/headers"; // Import cookies from next/headers
import BookComponent from "./book"; // Client-side component (book)
import { getAllPlaces } from "@/lib/book";
import { Place } from "@models/bookings";
import { Payload } from "@models/authmodel";
import { NextResponse } from "next/server";

// This is the server-side handler, no useState here
export default async function Book(req: Request) {
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
      <BookComponent payload={parsedPayload} places={places} />
    </div>
  );
}
