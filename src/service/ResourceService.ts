import { Location } from "../data/Location"

export const ResourceService = {
    loadDatasource: async(text: string) : Promise<Location[]> => {
        const rawResult = await fetch(`api/search/${text}`)
        const result = await rawResult.json();
        return result.map((l:any) => new Location(l));
    }
}