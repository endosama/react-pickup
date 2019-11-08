import { Location } from "../data/Location"
const API_BASE_URL = 'http://localhost:3001';

export const ResourceService = {
    loadDatasource: async(text: string) : Promise<Location[]> => {
        const rawResult = await fetch(`${API_BASE_URL}/api/search/${text}`)
        const result = await rawResult.json();
        return result.map((l:any) => new Location(l));
    }
}
