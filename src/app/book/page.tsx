"use client";
import { SelectPlace } from "@/components/SelectPlace";
import { Place } from "@models/bookings";
import { useState } from "react";


export default function BookPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-t from-indigo-100 to-indigo-50 font-semibold">
      <h1 className="px-5 text-center text-4xl text-main">
        Book a field
      </h1>
      <div className="card bg-base-100 w-1/3 shadow-sm">
        <figure>
          <img
            src={selectedPlace?.image ? (`/places_images/${selectedPlace.image}`) : ("/places_images/vector.jpg")}
            alt={selectedPlace?.name ? (`/places_images/${selectedPlace.image}`) : ("No field")}/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{selectedPlace ?
          (<div className="flex flex-row w-full justify-between items-center">
            <h2>{selectedPlace.name}</h2>
            <SelectPlace buttonTitle="Change field" buttonClass = "btn-secondary" selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
          </div>)
          : ( <SelectPlace buttonTitle="Select a field" selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
          )}</h2>
          <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">content</div>
          <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">content</div>
          </div>
          <div className="card-actions justify-center">
            <button className="w-full btn-primary bg-main hover:bg-main-darker">Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}
