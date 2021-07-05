import React from 'react'
import "./Category.css";



const DropdownQty = ({ qty, items, selection, setSelection, multiSelect = false, setShowQtyButton,
    setCartButton }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        setSelection(event.target.value);
        setShowQtyButton(false)
        setCartButton(true)

    };

    // const handleChange = event => {

    // };


    return (

        <form onSubmit={handleSubmit}>
            <label>
                Pick your favorite flavor:
                <select value={selection}>
                    <option value="Quantity" selected>Quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>

    );


};

export default DropdownQty;