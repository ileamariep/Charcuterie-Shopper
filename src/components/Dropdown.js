import React, { useState } from 'react'
import "./dropdown.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

//https://stackoverflow.com/questions/29108779/how-to-get-selected-value-of-a-dropdown-menu-in-reactjs


function Dropdown({ qty, items, selection, setSelection, multiSelect = false, setShowQtyButton,
    setCartButton }) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);


    function handleOnClick(item) {
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item.qty]);
                setOpen(false)
                setShowQtyButton(false)
                setCartButton(true)
            } else if (multiSelect) {
                setSelection([...selection, item.qty]);
                setOpen(false)
                setShowQtyButton(false)
                setCartButton(true)
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval]);
            setOpen(false)
        }
    }



    function isItemInSelection(item) {
        if (selection.some(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    return (
        <div className="dd-wrapper">
            <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}
            >
                <div className="dd-header__title">
                    <p className="dd-header__title--bold">{qty}</p>
                </div>
                <div className="dd-header__action">
                    <Button className='select-qty'>{open ? null : `SELECT QTY`}</Button>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map(item => (
                        <li className="dd-list-item" key={item.id}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item.qty} </span>
                                <span>{isItemInSelection(item) && 'Selected'}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}



export default Dropdown;