"use client";
import { joinBooking } from "@/lib/bookdb";
import { Payload } from "@models/authmodel";
import { Booking, Place } from "@models/bookings";
import Link from "next/link";

interface BookingInfoProps {
  booking: Booking;
  place?: Place;
  payload?: Payload;
  booking_participants?: Number;
  isUserParticipant?: boolean;
}

export default function BookingInfoComponent({
  place,
  booking,
  payload,
  booking_participants,
  isUserParticipant,
}: BookingInfoProps) {
  const handleJoinBooking = async (id: string, user_id: string) => {
    try {
      await joinBooking(id, user_id);
      console.log("Booking joined successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error joining booking:", error);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formattedDate = booking?.date
    ? new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <div
      style={{
        backgroundImage: `url('/places/${place?.image}')`,
        backgroundSize: "cover",
      }}
      className="h-screen w-screen"
    >
      <div className="from-dark/100 to-dark/50 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-gradient-to-t font-semibold backdrop-blur-xs">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            {/* Hero Image */}
            <div className="relative h-80 w-full overflow-hidden">
              <img
                src={`/places/${place?.image}`}
                alt={place?.name || "Booking location"}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h1 className="text-3xl font-bold text-white">
                  {place?.name || "Booking Details"}
                </h1>
                <p className="mt-2 text-xl text-white/90">{formattedDate}</p>
              </div>
            </div>
            {/* Info Section */}
            <div className="p-6">
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left column */}
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h2 className="mb-1 text-sm font-medium text-gray-500">
                      Location
                    </h2>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(place?.location || "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-main hover:text-main-darker flex items-center font-semibold"
                    >
                      <span>{place?.location || "Location not specified"}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h2 className="mb-1 text-sm font-medium text-gray-500">
                      Hours
                    </h2>
                    <p className="font-semibold text-gray-900">
                      {place?.hours_open || "Hours not specified"}
                    </p>
                  </div>
                </div>
                {/* Right column */}
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h2 className="mb-1 text-sm font-medium text-gray-500">
                      Players
                    </h2>
                    <div className="flex items-center">
                      <span className="text-main text-xl font-bold">
                        {booking_participants
                          ? `${booking_participants}/${booking.players}`
                          : booking.players}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-main ml-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h2 className="mb-1 text-sm font-medium text-gray-500">
                      Date & Time
                    </h2>
                    <p className="font-semibold text-gray-900">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
              {payload ? (
                payload.id != booking.user_id ? (
                  isUserParticipant ? (
                    <button
                      className="flex w-full cursor-not-allowed items-center justify-center space-x-2 rounded-lg bg-green-500 py-4 font-medium text-white shadow-md"
                      disabled
                    >
                      <span>Already Joined</span>
                    </button>
                  ) : booking_participants === booking.players ? (
                    <button
                      className="flex w-full cursor-not-allowed items-center justify-center space-x-2 rounded-lg bg-gray-400 py-4 font-medium text-white shadow-md"
                      disabled
                    >
                      <span>Booking Full</span>
                    </button>
                  ) : (
                    <button
                      className="bg-main hover:bg-main-darker flex w-full items-center justify-center space-x-2 rounded-lg py-4 font-medium text-white shadow-md transition duration-300 hover:shadow-lg"
                      onClick={() => {
                        if (booking && booking.id) {
                          handleJoinBooking(booking.id, payload.id);
                        } else {
                          console.error("Booking ID is undefined");
                        }
                      }}
                    >
                      <span>Join Booking</span>
                    </button>
                  )
                ) : (
                  <button
                    className="bg-main hover:bg-main-darker flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg py-4 font-medium text-white shadow-md transition duration-300 hover:shadow-lg"
                    onClick={() =>
                      handleCopy(`${window.location.origin}/book/${booking.id}`)
                    }
                  >
                    Share Booking
                  </button>
                )
              ) : (
                <div className="w-full rounded-lg bg-gray-100 py-4 text-center font-medium text-gray-700">
                  You need to be logged in to join this booking
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="btn-primary bg-main w-1/4">
          <Link href={"/"}>Go to home page </Link>
        </button>
      </div>
    </div>
  );
}
