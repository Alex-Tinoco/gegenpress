"use server";

interface Response {
    status: number;
    data: any[];
}

export default async function getAgents(): Promise<Response> {
    try {
        const params = new URLSearchParams({
            isPlayableCharacter: "true",
        });

        // const response = await fetch(`https://valorant-api.com/v1/agents?${params}`);
        const response = await fetch(`https://valorant-api.com/v1/maps`);


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Response = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch agents: ${(error as Error).message}`);
    }
}
