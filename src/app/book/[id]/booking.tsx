import { Booking, Place } from "@models/bookings";

interface BookingInfoProps {
  booking: Booking;
  place: Place | undefined;
}

export default function BookingInfoComponent({
  place,
  booking,
}: BookingInfoProps) {
  return (
    <div>
      Booking Info :{place?.name}
      {booking.date.toLocaleDateString()}
      {booking.players}
      {booking.user_id}
      {place?.location}
      {place?.hours_open}
      {place?.image}
    </div>
  );
}
