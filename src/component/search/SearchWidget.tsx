import React from 'react';
import { Dropdown } from './../dropdown/Dropdown';
import './SearchWidget.scss'

export const SearchWidget: React.FC =  () => { 
    return <div className="SearchWidget">
        <h1>Where are we going?</h1>
        <Dropdown label={'Pick-up Location'} placeholder={'city, airport, station, region and district...'}></Dropdown>
    </div>
}