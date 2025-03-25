"use client";
import { joinReservation } from "@/lib/bookdb";
import { Payload } from "@models/authmodel";
import { Place } from "@models/bookings";
import { Reservation } from "@models/reservation";

interface ReservationInfoProps {
  reservation: Reservation;
  place?: Place;
  payload?: Payload;
}

export default function ReservationInfoComponent({
  place,
  reservation,
  payload,
}: ReservationInfoProps) {
  const handleJoinSession = async (id: string, user_id: string) => {
    try {
      await joinReservation(id, user_id);
      console.log("Reservation joined successfully");
    } catch (error) {
      console.error("Error joining Reservation:", error);
    }
  };

  return (
    <div className="center-flex flex-col gap-4">
      <span>Reservation Info :{place?.name}</span>
      <span>{reservation.date.toLocaleDateString()}</span>
      <span>{reservation.players}</span>
      <span>{reservation.duration}</span>
      <span>{reservation.description}</span>
      <span>{place?.location}</span>
      <span>{place?.hours_open}</span>
      <img src={`/places/${place?.image}`} alt={place?.name} className="h-96" />
      {payload ? (
        <button
          className="btn-primary bg-main-lighter hover:bg-main w-full"
          onClick={() => {
            if (reservation && reservation.id) {
              handleJoinSession(reservation.id, payload.id);
            } else {
              console.error("Booking ID is undefined");
            }
          }}
        >
          Join
        </button>
      ) : (
        <div>You need to be logged in to join this Reservation</div>
      )}
    </div>
  );
}
