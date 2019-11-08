import { Location } from "../data/Location"

export const ResourceService = {
    loadDatasource: async(text: string) : Promise<Location[]> => {
        const rawResult = await fetch("/.netlify/functions/node-fetch?text="+text, { headers: { accept: "Accept: application/json" } })
        const result = await rawResult.json();
        return result.locations.map((l:any) => new Location(l));
    }
}
