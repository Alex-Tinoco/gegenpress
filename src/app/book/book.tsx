"use client";
import { SelectPlace } from "@/components/SelectPlace";
import { CreateBooking, joinBooking } from "@/lib/bookdb";
import { Payload } from "@models/authmodel";
import { Booking, Place } from "@models/bookings";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

interface BookProps {
  payload: Payload;
  places: Place[];
}

export default function BookComponent({ payload, places }: BookProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [playersCounter, setPlayersCounter] = useState(10);

  const maxPlayers = 10;
  const today = new Date();
  const twoMonthsAfter = new Date(today);
  twoMonthsAfter.setMonth(today.getMonth() + 2);
  const router = useRouter();

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    console.log("Payload changed:", payload);
  }, [payload]); // Runs only when `payload` updates

  const handleBooking = async () => {
    if (!selectedPlace || !selectedDate || playersCounter < 1) {
      alert("Please fill out all fields correctly.");
      return;
    }
    const bookingdata: Booking = {
      date: selectedDate,
      players: playersCounter,
      place_id: selectedPlace.id,
      user_id: payload.id,
    };

    try {
      console.log(bookingdata);
      let createdBooking = await CreateBooking(bookingdata);
      try {
        await joinBooking(createdBooking.id, payload.id);
      } catch (e) {
        console.log("Error joining booking");
      }
      //redirect to validation page
      router.push("/book/" + createdBooking.id);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking.");
    }
  };

  return (
    <div className="h-screen w-screen bg-[url(/backgrounds/bgstadium.jpg)] bg-cover">
      <div className="from-dark/100 to-dark/50 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-gradient-to-t font-semibold backdrop-blur-xs">
        <h1 className="text-main px-5 text-center text-4xl">Book a field</h1>
        <div className="card bg-light rounded-md shadow-lg lg:w-1/3">
          <figure>
            <img
              src={
                selectedPlace?.image
                  ? `/places/${selectedPlace.image}`
                  : "/backgrounds/vector.jpg"
              }
              alt={
                selectedPlace?.name
                  ? `/places/${selectedPlace.image}`
                  : "No field"
              }
              className="max-h-96 w-full rounded-t-md"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {selectedPlace ? (
                <div className="flex w-full flex-row items-center">
                  <h2 className="w-full">{selectedPlace.name}</h2>
                  <SelectPlace
                    places={places}
                    buttonTitle="Change field"
                    buttonClass="btn-secondary self-end"
                    selectedPlace={selectedPlace}
                    setSelectedPlace={setSelectedPlace}
                  />
                </div>
              ) : (
                <SelectPlace
                  places={places}
                  buttonTitle="Select a field"
                  buttonClass="btn-primary bg-dark hover:bg-gray-700 w-full"
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                />
              )}
            </h2>
            <div className="bg-dark text-light flex w-full flex-col items-center justify-evenly rounded-md lg:flex-row">
              <div
                className={`center-flex mt-3.5 gap-2 lg:mt-0 ${selectedDate && "flex-col"}`}
              >
                <h2 className="text-xl">
                  Date : {selectedDate?.toLocaleDateString()}
                </h2>
                <button
                  popoverTarget="rdp-popover"
                  className="btn-secondary"
                  style={{ anchorName: "--rdp" } as React.CSSProperties}
                  onClick={() => setIsCalendarOpen(true)}
                >
                  {selectedDate ? "Change date" : "Pick a date"}
                </button>
                {isCalendarOpen && (
                  <div
                    popover="auto"
                    id="rdp-popover"
                    className="dropdown bg-dark rounded-md p-4"
                    style={{ positionAnchor: "--rdp" } as React.CSSProperties}
                  >
                    <DayPicker
                      className="react-day-picker text-light"
                      classNames={{
                        day: "text-lg hover:text-gray-400",
                        selected: "text-main",
                        month_caption:
                          "text-lg m-auto flex items-center justify-center",
                        weekday: "text-xl",
                        button_next: "fill-main mb-4",
                        button_previous: "fill-main mb-4",
                      }}
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDayClick}
                      disabled={{
                        before: today,
                        after: twoMonthsAfter,
                      }}
                      required
                    />
                  </div>
                )}
              </div>
              <div className="center-flex bg-dark text-light flex-col rounded-md p-4 text-xl">
                <h2 className="flex gap-2 text-2xl">
                  <span
                    className={
                      playersCounter < 2
                        ? "text-main select-none"
                        : "cursor-pointer select-none"
                    }
                    onClick={() => {
                      playersCounter > 1 &&
                        setPlayersCounter(playersCounter - 1);
                    }}
                  >
                    -
                  </span>
                  {playersCounter}
                  <span
                    className={
                      playersCounter == maxPlayers
                        ? "text-main select-none"
                        : "cursor-pointer select-none"
                    }
                    onClick={() => {
                      playersCounter < maxPlayers &&
                        setPlayersCounter(playersCounter + 1);
                    }}
                  >
                    +
                  </span>
                </h2>
                <h2 className="">Player{playersCounter > 1 && "s"}</h2>
              </div>
            </div>
            <div className="card-actions tooltip tooltip-error tooltip-bottom justify-center rounded-md">
              <button
                className="btn-primary bg-main hover:bg-main-darker w-full"
                onClick={handleBooking}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
