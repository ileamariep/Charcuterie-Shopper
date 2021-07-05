import React from "react";
import "./Admin.css";
// import { getSomething } from "../api";
import { addAnIngredient } from "../api/ingredients";

const AdminAddProduct = ({
    ingredientName, ingredientDescription, ingredientPrice, ingredientCategory, ingredientStockQty, ingredientImg, ingredientImgAlt, setIngredientName,
    setIngredientDescription,
    setIngredientPrice,
    setIngredientCategory,
    setIngredientStockQty,
    setIngredientImg,
    setIngredientImgAlt,
    setShowAddForm, }) => {


    const HandleFormSubmit = (event) => {
        event.preventDefault()
        addAnIngredient(ingredientName, ingredientDescription, ingredientPrice, ingredientCategory, ingredientStockQty, ingredientImg, ingredientImgAlt)
        setShowAddForm(false)
    }

    const handleButtonCancel = () => {

        setShowAddForm(false)
    }
    return (
        <>
            <div className="form-title">Create A New Product</div>

            <form onSubmit={HandleFormSubmit}
                className="form-container">

                <div className="form-inputs">
                    <label>
                        <input
                            name="Product Name"
                            placeholder="Name"
                            value={ingredientName}
                            onInput={(event) => {
                                setIngredientName(event.target.value)
                            }}
                            required />
                    </label>

                    <label className='Description'>
                        <input
                            name="Description"
                            placeholder="Description"
                            value={ingredientDescription}
                            onInput={(event) => {
                                setIngredientDescription(event.target.value)
                            }}
                            required />
                    </label>

                    <label className='Price'>

                        <input
                            name="Price"
                            placeholder="Price"
                            value={ingredientPrice}
                            onInput={(event) => {
                                setIngredientPrice(event.target.value)
                            }}
                            required />
                    </label>
                    <br />
                    <label className='Category'>

                        <input
                            name="Category"
                            placeholder="Category"
                            value={ingredientCategory}
                            onInput={(event) => {
                                setIngredientCategory(event.target.value)
                            }}
                            required />
                    </label>

                    <label className='stock-qty'>
                        <input
                            name="Stock"
                            placeholder="Stock Quantity"
                            value={ingredientStockQty}
                            onInput={(event) => {
                                setIngredientStockQty(event.target.value)
                            }}
                            required />
                    </label>

                    <label className='add-image'>

                        <input
                            name="image"
                            placeholder="Image URL"
                            value={ingredientImg}
                            onInput={(event) => {
                                setIngredientImg(event.target.value)
                            }}
                            required />
                    </label>

                    <label className='add-alt-tag'>
                        <input
                            name="image-alt"
                            placeholder="Image Alt Tag"
                            value={ingredientImgAlt}
                            onInput={(event) => {
                                setIngredientImgAlt(event.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div className='add-container'>
                    <button type='submit' className='ingredient-add'>Submit</button>
                </div>
                <button className='ingredient-add-cancel' onClick={handleButtonCancel}>Cancel</button>
            </form>




        </>
    )
};

export default AdminAddProduct;