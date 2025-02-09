"use server";

interface Response {
    status: number;
    data: any[];
}

const language: string = "en-US"; //"fr-FR"

export default async function getDataAPI(option: string): Promise<Response> {
    try {
        const params = new URLSearchParams({
            language,
        });

        let query: string = "";

        switch (option) {
            default: {
                throw new Error(`API not available`);
            }
            case "maps": {
                query = "maps";
                break;
            }
            case "agents": {
                query = "agents";
                params.append("isPlayableCharacter", "true");
                break;
            }
            case "weapons": {
                query = "weapons"
                break;
            }
        }

        const response = await fetch(`https://valorant-api.com/v1/${query}?${params}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Response = await response.json();
        return data;

    } catch (error) {
        throw new Error(`Failed to fetch API: ${(error as Error).message}`);
    }
}
