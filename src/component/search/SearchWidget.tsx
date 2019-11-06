import React, { useState, ChangeEvent } from 'react';
import './SearchWidget.scss'
import { ResourceService } from '../../service/ResourceService';
import { Location } from '../../data/Location';
import { DropdownItem } from '../dropdown/DropdownItem';

type DatasourceType = Location[] | null;

export const SearchWidget: React.FC =  () => {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [datasource, setDatasource] = useState<DatasourceType>(null)
    const handleSetText = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setText(value)
        if(value && value.length > 1) {
            setLoading(true)
            const ds = await ResourceService.loadDatasource(value);
            setDatasource(ds)
            setLoading(false)
        } else {
            setDatasource(null)
        }
    };
 
    return <div className="SearchWidget__container">
        <h1>Where are we going?</h1>
        <div className="SearchWidget__label">Pick-up Location</div>
        <div>
            <input className="SearchWidget__input" value={text} onChange={handleSetText} type='text' placeholder='city, station, airport, region, distrinct...'/>
            {loading && <span>LOADING...</span>}
        </div>
        <div className="SearchWidget__pickup">
            {
                datasource &&
                    (
                        datasource.length > 0 ?
                            datasource.map((location: Location, i: number) => (<DropdownItem key={i} location={location}></DropdownItem>))
                        :
                            <span>No results found</span>
                    )
            }
        </div>
    </div>
}