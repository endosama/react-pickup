import React from 'react';
import { Location, LocationType } from '../../data/Location';
import './LocationDropdownItem.scss'

interface ILocationDropdownItem {
    location: Location
}

export const LocationDropdownItem: React.FC<ILocationDropdownItem> = ({location}: {location:Location}) => {
    let typeLabel: string
    let typeColor: string

    switch(location.type) {
        case LocationType.Airport: 
            typeLabel = 'Airport'
            typeColor = 'red'
            break;
        case LocationType.Station: 
            typeLabel = 'Station'
            typeColor = 'gray'
            break;
        case LocationType.City:
        default: 
            typeLabel = 'City'
            typeColor = 'blue'
            break;
    }

    return <div className='LocationDropdownItem'>
            <div className='LocationDropdownItem__type'>
                <span style={{backgroundColor: typeColor}}>{typeLabel}</span>
            </div>
            <div className='LocationDropdownItem__content'>
                <div className='LocationDropdownItem__content__title'>
                    {location.getLocationName()}
                </div>
                <div className='LocationDropdownItem__content__subtitle'>
                    <div>{location.getCountryDescription()}</div>
                </div>
            </div>
        </div>
}