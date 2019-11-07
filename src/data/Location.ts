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
    country: string;
    constructor(raw : {name: string, iata: string, type: LocationType, city: string, region: string, country: string}) {
        this.name = raw.name;
        this.iata = raw.iata;
        this.type = raw.type;
        this.city = raw.city;
        this.region = raw.region;
        this.country = raw.country;
    }
    getCountryDescription() {
        let stringDescriptions = this.type === LocationType.Airport ? [this.city, this.country] : [this.city, this.region, this.country];
        return stringDescriptions.filter(str => str !== undefined && str !== '').join(', ')
    }
    getLocationName() {
        if(this.type === LocationType.Airport) {
            return `${this.name} (${this.iata})`;
        } else {
            return this.name;
        }
    }

    getFullDescription() {
        return `${this.getLocationName()}, ${this.getCountryDescription()}`
    }
}