"use server";

export interface Location {
  name: string;
  countryName: string;
  adminName1: string;
  lat: number;
  lng: number;
}

const language: string = "en"; //"fr-FR"
const username = process.env.GEONAMES_USERNAME;

export default async function searchByText(query: string): Promise<Location[]> {
  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=30&featureClass=P&lang=${language}&username=${username}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: { geonames: Location[] } = await response.json();
    const returnedData = data.geonames.map(
      ({ name, countryName, adminName1, lat, lng }: Location) => ({
        name,
        countryName,
        adminName1,
        lat,
        lng,
      }),
    );
    return returnedData;
  } catch (error) {
    throw new Error(`Failed to fetch API: ${(error as Error).message}`);
  }
}
