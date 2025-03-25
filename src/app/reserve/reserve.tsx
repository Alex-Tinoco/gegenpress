"use client";
import { SelectPlace } from "@/components/SelectPlace";
import { sessionReservation } from "@/lib/bookdb";
import { Payload } from "@models/authmodel";
import { Place } from "@models/bookings";
import { Reservation } from "@models/reservation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

interface ReserveProps {
  payload: Payload;
  places: Place[];
}

export default function ReserveComponent({ payload, places }: ReserveProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [playersCounter, setPlayersCounter] = useState(10);
  const [duration, setDuration] = useState(0); // Default 1 hour (position 0)
  const [description, setDescription] = useState("");

  const maxPlayers = 10;
  const today = new Date();
  const twoMonthsAfter = new Date(today);
  twoMonthsAfter.setMonth(today.getMonth() + 2);
  const router = useRouter();

  // Duration options in minutes
  const durationOptions = [60, 120, 180, 240]; // 1h, 2h, 3h, 4h

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = minutes / 60;
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    console.log("Payload changed:", payload);
  }, [payload]); // Runs only when `payload` updates

  const handlereservation = async () => {
    if (!selectedPlace || !selectedDate || playersCounter < 1) {
      alert("Please fill out all fields correctly.");
      return;
    }
    const reservationdata: Reservation = {
      date: selectedDate,
      players: playersCounter,
      place_id: selectedPlace.id,
      user_id: payload.id,
      duration: durationOptions[duration],
      description: description,
    };

    try {
      console.log(reservationdata);
      let createdReservation = await sessionReservation(reservationdata);
      //redirect to validation page
      router.push("/reserve/" + createdReservation.id);
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("An error occurred while creating the reservation.");
    }
  };

  return (
    <div className="h-screen w-screen bg-[url(/backgrounds/bgtraining.jpg)] bg-cover">
      <div className="from-dark/100 to-dark/50 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-gradient-to-t font-semibold backdrop-blur-xs">
        <h1 className="text-light px-5 text-center text-4xl">
          Reserve a field for coaching
        </h1>

        <div className="card bg-light rounded-md shadow-lg lg:max-w-1/3">
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
              className="max-h-72 w-full rounded-t-md"
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
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
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

            {/* Session Duration */}
            <div className="mt-4">
              <h2 className="text-xl">
                Duration:{" "}
                <span className="text-main">
                  {formatDuration(durationOptions[duration])}
                </span>
              </h2>
              <div className="w-full">
                <input
                  type="range"
                  min={0}
                  max={durationOptions.length - 1}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="range w-full rounded-md"
                  step="1"
                />
                <div className="mt-2 flex justify-between px-2 text-xs">
                  {durationOptions.map((_, index) => (
                    <span key={index}>|</span>
                  ))}
                </div>
                <div className="mt-2 flex justify-between px-2 text-xs">
                  {durationOptions.map((option, index) => (
                    <span
                      key={index}
                      className={
                        duration === index ? "text-main font-bold" : ""
                      }
                    >
                      {formatDuration(option)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <textarea
              className="textarea bg-dark mt-4 w-full rounded-md p-4 text-lg text-white"
              placeholder="Session description"
              rows={3}
              maxLength={1000}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="card-actions tooltip tooltip-error tooltip-bottom mt-4 justify-center rounded-md">
              <button
                className="btn-primary bg-main hover:bg-main-darker w-full"
                onClick={handlereservation}
              >
                Reserve a session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
