"use client";
import Link from "next/link";
import { Payload } from "@models/authmodel";
import { Place } from "@models/bookings";
import { useState } from "react";

interface AdminDashboardProps {
  placesBookings: { [key: string]: any };
  bookings: any[];
  payload?: Payload;
  places?: Place[];
}

export default function AdminDashboardComponent({
  placesBookings,
  bookings,
  payload,
  places = [],
}: AdminDashboardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  // Combine places data with booking counts
  const placesList = places.map((place) => ({
    ...place,
    bookingCount: placesBookings[place.id]?.bookingCount || 0,
  }));

  placesList.sort((a, b) => b.bookingCount - a.bookingCount);

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-1 text-sm font-medium text-gray-500">
            Total Places
          </h3>
          <p className="text-3xl font-bold">{places.length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-1 text-sm font-medium text-gray-500">
            Total Bookings
          </h3>
          <p className="text-3xl font-bold">{bookings.length}</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Places</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {placesList.map((place) => (
            <div
              key={place.id}
              className="card h-80 w-72 cursor-pointer bg-white shadow-md hover:shadow-lg"
              onClick={() => {
                setSelectedPlace(place);
                setModalOpen(true);
              }}
            >
              <figure className="h-40 overflow-hidden">
                <img
                  src={`/places/${place.image}`}
                  alt={place.name}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">{place.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-main text-lg font-bold">
                    {place.bookingCount} bookings
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selectedPlace && (
        <dialog className="modal" open={modalOpen}>
          <div className="modal-box bg-light max-w-2/3 rounded-md">
            <div className="flex flex-col">
              <div className="relative h-56 w-full overflow-hidden rounded-t-md">
                <img
                  src={`/places/${selectedPlace.image}`}
                  alt={selectedPlace.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedPlace.name}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="mb-1 text-sm text-gray-500">Location</h3>
                  <p>{selectedPlace.location}</p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-1 text-sm text-gray-500">Hours</h3>
                  <p>{selectedPlace.hours_open}</p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-1 text-sm text-gray-500">Bookings</h3>
                  <p className="text-main text-2xl font-bold">
                    {selectedPlace.bookingCount}
                  </p>
                </div>

                {/* Bookings section */}
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold">Bookings</h3>
                  <div className="max-h-60 overflow-y-auto rounded border">
                    {bookings
                      .filter(
                        (booking) => booking.place_id === selectedPlace.id,
                      )
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="border-b p-3 last:border-b-0"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-1 text-sm">
                            <p>Creator: {booking.user_id}</p>
                            <p className="mt-1">Players: {booking.players}</p>
                          </div>
                        </div>
                      ))}
                    {bookings.filter(
                      (booking) => booking.place_id === selectedPlace.id,
                    ).length === 0 && (
                      <p className="p-3 text-center text-gray-500">
                        No bookings for this place
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModalOpen(false)}>Close</button>
          </form>
        </dialog>
      )}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
