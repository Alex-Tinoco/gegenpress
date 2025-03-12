"use client";

import searchByText from "@/lib/weather";
import { useEffect, useState } from "react";

export default function WeatherGeoSearch() {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchByText(`q=${query}&maxRows=10`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="m-20 flex w-fit flex-col justify-center gap-4 rounded-md border-2 p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="City or country.."
          className="rounded-md border-1 p-2"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-main hover:bg-main-darker rounded-md p-2 text-white"
        >
          Search City
        </button>
      </form>
      <div className="flex flex-col items-start gap-2">
        <p className="w-full border-b-1 border-gray-200 py-1 hover:bg-gray-100">
          New York, United States
        </p>
        <p className="w-full border-b-1 border-gray-200 py-1">
          New York, United States
        </p>
        <p className="w-full border-b-1 border-gray-200 py-1">
          New York, United States
        </p>
        <p className="w-full border-b-1 border-gray-200 py-1">
          New York, United States
        </p>
      </div>
    </div>
  );
}
