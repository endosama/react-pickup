    import React, { useState, ChangeEvent } from 'react';
import './Dropdown.scss'
import { ResourceService } from '../../service/ResourceService';
import { Location } from '../../data/Location';
import { DropdownItem } from '../dropdown/DropdownItem';

interface IDropdown {
    placeholder: string;
    label: string;
}

export const Dropdown: React.FC<IDropdown> = ({ placeholder, label }) => {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [datasource, setDatasource] = useState<Location[] | null>(null)
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
            }
        } else {
            setDatasource(null)
        }
    };

    return <div className="Dropdown">
        <div className="Dropdown__label">
            {label}
        </div>
        <div>
            <input className="Dropdown__input" value={text} onChange={handleSetText} type='text' placeholder={placeholder} />
            {loading && <span className="Dropdown__loader"></span>}
            <div className="Dropdown__pickup">
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
    </div>
}