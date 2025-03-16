"use client";

import { getAllPlaces } from "@/lib/book";
import { Places } from "@models/bookings";
import { useEffect, useState } from "react";

export default function BookPage() {
  const [places, setPlaces] = useState<Places[]>([]);

  async function fetchPlaces() {
    try {
      let placesfetched = await getAllPlaces();
      setPlaces(placesfetched);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }

  useEffect(() => {
    fetchPlaces();
    console.log(places);
  }, []);

  useEffect(() => {
    console.log(places);
  }, [places]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-t from-indigo-100 to-indigo-50 font-semibold">
      <h1>Book page</h1>
      <div className="flex flex-col gap-4">
        {places.map((place) => (
          <div key={place.id} className="flex flex-col gap-2">
            <h2 className="text-xl">{place.name}</h2>
            <p>{place.location}</p>
            <p>{place.hours_open}</p>
          </div>
        ))}
      </div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
