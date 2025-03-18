"use client";

import searchByText, { Location } from "@/lib/weather";
import { useEffect, useState } from "react";

export default function WeatherGeoSearch() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.length > 0) {
      try {
        const data = await searchByText(query);
        setData(data);
        console.log(data);
      } catch (err) {
        setError("An error occurred while fetching data.");
      }
    } else {
      setError("This field cannot be empty.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  useEffect(() => {
    if (query.length === 0) {
      setData([]);
      setSelectedLocation(null);
    } else {
      setError("");
    }
  }, [query]);

  const SelectLocation = (city: Location) => {
    setSelectedLocation(city);
  };

  return (
    <div className="m-20 flex w-fit flex-col justify-center gap-4 rounded-md border-2 p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="City or country.."
          className={`rounded-md border-1 p-2 ${error && "border-red-500"}`}
          onChange={handleChange}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-main hover:bg-main-darker rounded-md p-2 text-white"
        >
          Search City
        </button>
      </form>
      {data.length !== 0 && (
        <div className="scroll-y-auto flex max-h-64 flex-col items-start gap-2 overflow-y-scroll">
          {data.map((element) => (
            <p
              key={`${element.lat}-${element.lng}`}
              onClick={() => SelectLocation(element)}
              className={`w-full cursor-pointer border-b border-gray-200 py-1 pl-1 hover:bg-gray-200 ${selectedLocation?.lat === element.lat && selectedLocation?.lng === element.lng ? "bg-gray-300" : ""}`}
            >
              {element.name.charAt(0).toUpperCase() +
                element.name.slice(1).toLowerCase()}
              , {element.adminName1 ? `${element.adminName1}, ` : ""}
              {element.countryName}
            </p>
          ))}
        </div>
      )}
      {selectedLocation && (
        <div className="flex flex-row justify-between gap-2">
          <button className="w-full cursor-pointer rounded-md bg-green-500 p-2 text-white hover:bg-green-600">
            Select as my location
          </button>
        </div>
      )}
    </div>
  );
}
