import React from 'react';
import './DropdownItem.scss'

interface IDropdownItem {
    key: number
    notifyClick: Function
}

export const DropdownItem: React.FC<IDropdownItem> = ({notifyClick, children}) => {
    return <div className='DropdownItem' onClick={() => notifyClick()}>
            {children}
        </div>
}