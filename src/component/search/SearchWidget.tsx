import React, { useState, ChangeEvent } from 'react';
import './SearchWidget.scss'

export const SearchWidget: React.FC =  () => {
    const [text, setText] = useState("")
    const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    };
 
    return <div className="SearchWidget__container">
        <h1>Where are we going?</h1>
        <div className="SearchWidget__label">Pick-up Location</div>
        <input className="SearchWidget__pickup" value={text} onChange={handleSetText} type='text' placeholder='city, station, airport, region, distrinct...'/>
    </div>
}