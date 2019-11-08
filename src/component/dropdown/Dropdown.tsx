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
    const [inputText, setInputText] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [datasource, setDatasource] = useState<Location[]>([])
    const [isOpened, setOpened] = useState(false)

    const handleInputTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const inputTextValue = e.currentTarget.value
        setInputText(inputTextValue)
        if (inputTextValue && inputTextValue.length > 1) {
            setLoading(true)
            try {
                const result = await ResourceService.loadDatasource(inputTextValue);
                setDatasource(result)
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

    const notifyLocationItemSelected = (location: Location) => {
        setInputText(location.getFullDescription())
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
                id="Dropdown__input" //not unique if more than one dropdown in the dom. Add guid.
                className="Dropdown__input" 
                value={inputText} 
                onChange={handleInputTextChange} 
                type='text' 
                placeholder={placeholder} 
                />
            {
                isLoading && 
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
                                <DropdownItem key={i} notifyClick={() => notifyLocationItemSelected(location)}>
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
