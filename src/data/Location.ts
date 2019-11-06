export enum LocationType {
    Airport = 'A',
    City = 'C',
    Station = 'T'
}

export class Location {
    name: string;
    iata: string;
    type: LocationType;
    city: string;
    region: string;
    constructor(raw : {name: string, iata: string, type: LocationType, city: string, region: string}) {
        this.name = raw.name;
        this.iata = raw.iata;
        this.type = raw.type;
        this.city = raw.city;
        this.region = raw.region;
    }
}