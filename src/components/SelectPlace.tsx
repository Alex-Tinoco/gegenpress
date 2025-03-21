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

export const SelectPlace: React.FC<selectPlaceProps> = ({
  selectedPlace,
  setSelectedPlace,
  buttonTitle,
  buttonClass,
}) => {
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

  useEffect(() => {
    if (selectedPlace) setModalOpen(false);
  }, [selectedPlace]);

  return (
    <div className="flex w-full justify-end">
      <button
        className={`${buttonClass && buttonClass}`}
        onClick={() => setModalOpen(true)}
      >
        {buttonTitle}
      </button>
      {modalOpen && (
        <dialog className="modal" open={modalOpen}>
          <div className="modal-box bg-light h-3/4 w-full max-w-2/3 overflow-scroll rounded-md">
            <div className="flex flex-wrap items-center justify-evenly gap-6">
              {places.map((place) => (
                <div
                  className={`card h-80 w-72 shadow-sm ${place.name.startsWith("Urban") ? "bg-[#FF7832]" : "bg-[#2fbf6b]"}`}
                  key={place.name}
                >
                  <figure>
                    <img
                      src={`/places/${place.image}`}
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
                        className="btn-primary flex-1 border-black bg-black hover:bg-gray-800"
                      >
                        Choose
                      </button>
                      <Link
                        className="btn rounded-md bg-black p-1 hover:bg-gray-900"
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
