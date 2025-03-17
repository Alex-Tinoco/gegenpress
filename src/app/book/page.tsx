"use client";

import { getAllPlaces } from "@/lib/book";
import { Place } from "@models/bookings";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function BookPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  async function fetchPlaces() {
    try {
      let placesfetched = await getAllPlaces();
      setPlaces(placesfetched);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }

  function handleSelectPlace(place: Place) {
    setSelectedPlace(place);
    setModalOpen(false);
  }

  useEffect(() => {
    fetchPlaces();
    console.log(places);
  }, []);

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-t from-indigo-100 to-indigo-50 font-semibold">
      {selectedPlace && (
        <div className="text-black"> {selectedPlace.name} </div>
      )}
      <button className="btn" onClick={() => setModalOpen(true)}>
        Choose A Place
      </button>
      {modalOpen && (
        <dialog className="modal" open={modalOpen}>
          <div className="modal-box flex h-3/4 w-full max-w-2/3 overflow-scroll pb-4">
            <div className="flex flex-wrap gap-6">
              {places.map((place) => (
                <div
                  className={`card h-80 w-72 shadow-sm ${place.name.startsWith("Urban") ? "bg-[#FF7832]" : "bg-[#2fbf6b]"}`}
                  key={place.name}
                >
                  <figure>
                    <img
                      src={`/places_images/${place.image}`}
                      alt={place.name}
                      className="h-auto w-72"
                    />
                  </figure>
                  <div className="card-body text-sm">
                    <h2 className="card-title">{place.name} </h2>
                    <p>{place.hours_open.trim().split(";")[0]}</p>
                    <p>{place.hours_open.trim().split(";")[1]}</p>
                    <div className="card-actions mt-3 flex justify-center">
                      <button
                        onClick={() => handleSelectPlace(place)}
                        className="btn btn-soft flex-1"
                      >
                        Choose
                      </button>
                      <Link
                        className="btn p-1"
                        href={`https://www.google.com/maps?q=${place.location}`}
                        target="_blank"
                      >
                        <img
                          className="h-full w-auto"
                          src="https://img.icons8.com/?size=100&id=32215&format=png&color=000000"
                          alt="Google Maps"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModalOpen(false)}>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
