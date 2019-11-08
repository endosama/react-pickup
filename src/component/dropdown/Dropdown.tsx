import React, { useState, ChangeEvent } from 'react';
import { ResourceService } from '../../service/ResourceService';
import { Location } from '../../data/Location';
import { DropdownItem } from '../dropdown/DropdownItem';
import { LocationDropdownItem } from '../location/LocationDropdownItem';
import { Loader } from '../loader/Loader';
import './Dropdown.scss'

interface IDropdown {
    placeholder: string;
    label: string;
}

export const Dropdown: React.FC<IDropdown> = ({ placeholder, label }) => {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [datasource, setDatasource] = useState<Location[]>([])
    const [isOpened, setOpened] = useState(false)

    const handleSetText = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setText(value)
        if (value && value.length > 1) {
            setLoading(true)
            try {
                const ds = await ResourceService.loadDatasource(value);
                setDatasource(ds)
            } catch(e) {
                setDatasource([])
            } finally {
                setLoading(false)
                setOpened(true)
            }
        } else {
            setOpened(false)
            setDatasource([])
        }
    };

    const notifyLocationClicked = (location: Location) => {
        setText(location.getFullDescription())
        setOpened(false) 
    }

    return <div className="Dropdown">
        <label htmlFor="Dropdown__input" className="Dropdown__label">
            {label}
        </label>
        <div>
            <input 
                aria-label={label}
                aria-required="true"
                id="Dropdown__input" 
                className="Dropdown__input" 
                value={text} 
                onChange={handleSetText} 
                type='text' 
                placeholder={placeholder} 
                />
            {
                loading && 
                <span className="Dropdown__loader">
                    <Loader></Loader>
                </span>
            }
            <div className="Dropdown__pickup">
                {
                    isOpened &&
                    (
                        datasource.length > 0 ?
                            datasource.map((location: Location, i: number) => (
                                <DropdownItem key={i} notifyClick={() => notifyLocationClicked(location)}>
                                    <LocationDropdownItem location={location}></LocationDropdownItem>
                                </DropdownItem>)
                            )
                            :
                            <DropdownItem key={0} notifyClick={() => {}}>
                                <div>No results found</div>
                            </DropdownItem>
                    )
                }
            </div>
        </div>
    </div>
}
