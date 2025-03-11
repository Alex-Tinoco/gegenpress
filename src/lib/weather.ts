"use server";

interface Response {
  status: number;
  data: any[];
}

const language: string = "en-US"; //"fr-FR"
const Username = process.env.GEONAMES_USERNAME;

export default async function searchByText(query: string): Promise<Response> {
  try {
    const response = await fetch(
      `api.geonames.org/searchJSON?${query}&username=${Username}`,
    );

    http: if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Response = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch API: ${(error as Error).message}`);
  }
}
