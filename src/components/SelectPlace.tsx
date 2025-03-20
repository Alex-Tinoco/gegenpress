import { getAllPlaces } from "@/lib/book";
import { Place } from "@models/bookings";
import Link from "next/link";
import { useEffect, useState } from "react";

interface selectPlaceProps {
    buttonTitle: string;
    buttonClass?: string;
    selectedPlace: Place | null;
    setSelectedPlace: React.Dispatch<React.SetStateAction<Place | null>>;
}

export const SelectPlace: React.FC<selectPlaceProps> = ({ selectedPlace, setSelectedPlace, buttonTitle, buttonClass }) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

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

      useEffect(()=> {
        if (selectedPlace)
        setModalOpen(false);
      }, [selectedPlace]);

    return (
    <div>
      <button className={buttonClass ? (buttonClass) :("btn-primary bg-main hover:bg-main-darker")}
      onClick={() => setModalOpen(true)}>
        {buttonTitle}
      </button>
      {modalOpen && (
        <dialog className="modal" open={modalOpen}>
          <div className="modal-box h-3/4 w-full max-w-2/3 overflow-scroll bg-light rounded-md">
            <div className="flex flex-wrap items-center gap-6 justify-evenly">
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
                        onClick={() => setSelectedPlace(place)}
                        className="btn-primary border-black hover:bg-gray-800 bg-black flex-1"
                      >
                        Choose
                      </button>
                      <Link
                        className="btn bg-black hover:bg-gray-900 rounded-md p-1"
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
};

export default SelectPlace;