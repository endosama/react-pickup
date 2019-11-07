import React from 'react';
import { Location, LocationType } from '../../data/Location';
import './DropdownItem.scss'

interface IDropdownItem {
    location: Location;
    key: number
}

export const DropdownItem: React.FC<IDropdownItem> = (props) => {
    const {location} = props;
    let typeName: string
    let typeColor: string
    switch(location.type) {
        case LocationType.Airport: 
            typeName = 'Airport'
            typeColor = 'red'
            break;
        case LocationType.Station: 
            typeName = 'Station'
            typeColor = 'gray'
            break;
        default: 
            typeName = 'City'
            typeColor = 'blue'
            break;
    }

    return <div className='DropdownItem'>
            <div className='DropdownItem__type'>
                <span style={{backgroundColor: typeColor}}>{typeName}</span>
            </div>
            <div className='DropdownItem__content'>
                <div className='DropdownItem__content__title'>
                    <strong>{location.name}</strong>
                    {location.iata ? <span>({location.iata})</span> : ''}
                </div>
                <div className='DropdownItem__content__subtitle'>
                    <div>{location.region}</div>
                </div>
            </div>
        </div>
}