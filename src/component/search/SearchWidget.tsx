import React from 'react';
import { Dropdown } from './../dropdown/Dropdown';
import './SearchWidget.scss'

export const SearchWidget: React.FC = () => {
    return <div className="SearchWidget">
        <h2 className="SearchWidget__title">
            Where are we going?
        </h2>
        <Dropdown label={'Pick-up Location'} placeholder={'city, airport, station, region and district...'}></Dropdown>
    </div>
}