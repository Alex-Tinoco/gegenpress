// app/book/page.tsx
"use server";
import { cookies } from "next/headers"; // Import cookies from next/headers
import ProfileComponent from "./profile"; // Client-side component (book)
import { getAllPlaces } from "@/lib/bookdb";
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
  const parsedPayload: Payload = JSON.parse(cookieValue);

  const userInfo = await findUserByEmail(parsedPayload.email);

  let places: Place[] = [];
  try {
    places = await getAllPlaces();
  } catch (error) {
    console.error("Error fetching places:", error);
  }

  return (
    <div>
      <ProfileComponent
        payload={parsedPayload}
        places={places}
        userInfo={userInfo}
      />
    </div>
  );
}
