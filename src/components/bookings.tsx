import { deleteBooking } from "@/lib/bookdb";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Booking, Place } from "@models/bookings";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BookingProps {
  userId: string;
  bookings: Booking[];
  places: Place[];
}

const Bookings: React.FC<BookingProps> = ({ userId, bookings, places }) => {
  useEffect(() => {
    console.log("Bookings :", places);
  }, [places]);

  const getPlaceName = (id: number) => {
    const place = places.find((place) => place.id === id);
    return place ? place.name : "Unknown";
  };

  const handleDeleteBooking = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking? This action cannot be undone.",
    );
    if (confirmed) {
      try {
        await deleteBooking(id);
        console.log("Booking deleted successfully");
      } catch (error) {
        console.error("Error deleting booking:", error);
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

  if (bookings.length! < 1) {
    return (
      <div className="center-flex flex-col gap-5">
        <span className="text-xl"> No bookings found</span>
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
      <span className="text-xl">My Bookings</span>
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
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-main/50">
              <td>{booking.date.toDateString()}</td>
              <td>{getPlaceName(booking.place_id)}</td>
              <td>{booking.players}</td>
              <td className="flex gap-2 font-bold">
                <button
                  className="btn-primary bg-light text-md hover:bg-white"
                  onClick={() => {
                    booking.id && handleDeleteBooking(booking.id);
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
                    handleCopy(`${window.location.origin}/book/${booking.id}`)
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

export default Bookings;
