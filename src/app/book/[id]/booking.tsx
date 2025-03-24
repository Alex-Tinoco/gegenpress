"use client";
import { joinBooking } from "@/lib/bookdb";
import { Payload } from "@models/authmodel";
import { Booking, Place } from "@models/bookings";

interface BookingInfoProps {
  booking: Booking;
  place?: Place;
  payload?: Payload;
}

export default function BookingInfoComponent({
  place,
  booking,
  payload,
}: BookingInfoProps) {
  const handleJoinBooking = async (id: string, user_id: string) => {
    try {
      await joinBooking(id, user_id);
      console.log("Booking joined successfully");
    } catch (error) {
      console.error("Error joining booking:", error);
    }
  };

  return (
    <div className="center-flex flex-col gap-4">
      <span>Booking Info :{place?.name}</span>
      <span>{booking.date.toLocaleDateString()}</span>
      <span>{booking.players}</span>
      <span>{place?.location}</span>
      <span>{place?.hours_open}</span>
      <img src={`/places/${place?.image}`} alt={place?.name} className="h-96" />
      {payload ? (
        <button
          className="btn-primary bg-main-lighter hover:bg-main w-full"
          onClick={() => {
            if (booking && booking.id) {
              handleJoinBooking(booking.id, payload.id);
            } else {
              console.error("Booking ID is undefined");
            }
          }}
        >
          Join
        </button>
      ) : (
        <div>You need to be logged in to join this booking</div>
      )}
    </div>
  );
}
