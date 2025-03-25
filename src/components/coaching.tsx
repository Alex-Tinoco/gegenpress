import { deleteReservation } from "@/lib/bookdb";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Place } from "@models/bookings";
import { Reservation } from "@models/reservation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CoachingProps {
  userId: string;
  reservations: Reservation[];
  places: Place[];
}

const Coaching: React.FC<CoachingProps> = ({
  userId,
  reservations,
  places,
}) => {
  useEffect(() => {
    console.log("reservations :", places);
  }, [places]);

  const getPlaceName = (id: number) => {
    const place = places.find((place) => place.id === id);
    return place ? place.name : "Unknown";
  };

  const handleDeleteReservation = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reservation? This action cannot be undone.",
    );
    if (confirmed) {
      try {
        await deleteReservation(id);
        console.log("reservation deleted successfully");
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (reservations.length! < 1) {
    return (
      <div className="center-flex flex-col gap-5">
        <span className="text-xl"> No reservations found</span>
        <Link href={"/book"}>
          <button className="btn-primary bg-main hover:bg-main-darker text-md">
            Book Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="center-flex flex-col gap-4">
      <span className="text-xl">My reservations</span>
      <table className="bg-main/70 table rounded-md p-4 text-center">
        <thead>
          <tr>
            <th>Date</th>
            <th>Place</th>
            <th>Players</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-main/50">
              <td>{reservation.date.toDateString()}</td>
              <td>{getPlaceName(reservation.place_id)}</td>
              <td>{reservation.max_players}</td>
              <td className="flex gap-2 font-bold">
                <button
                  className="btn-primary bg-light text-md hover:bg-white"
                  onClick={() => {
                    reservation.id && handleDeleteReservation(reservation.id);
                  }}
                >
                  <span className="text-main flex items-center justify-center gap-2">
                    <TrashIcon className="h-5 w-5" />
                    Delete
                  </span>
                </button>
                <button
                  className="btn-primary bg-light text-md hover:bg-white"
                  onClick={() =>
                    handleCopy(
                      `${window.location.origin}/reserve/${reservation.id}`,
                    )
                  }
                >
                  <span className="text-main flex items-center justify-center gap-2">
                    <ClipboardDocumentIcon className="h-5 w-5" /> Share
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"/book"} className="w-full">
        <button className="btn-primary bg-main-lighter hover:bg-main w-full">
          Book another field
        </button>
      </Link>
    </div>
  );
};

export default Coaching;
