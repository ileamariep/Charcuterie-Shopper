import React from "react";
import "./AdminAdd.css";
// import { getSomething } from "../api";
import { addAnIngredient } from "../api/ingredients";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminAddProduct = ({
    ingredientName, ingredientDescription, ingredientPrice, ingredientCategory, ingredientStockQty, ingredientImg, ingredientImgAlt, setIngredientName,
    setIngredientDescription,
    setIngredientPrice,
    setIngredientCategory,
    setIngredientStockQty,
    setIngredientImg,
    setIngredientImgAlt,
    setShowAddForm, }) => {


    const HandleFormSubmit = async (event) => {
        event.preventDefault()
        await addAnIngredient(ingredientName, ingredientDescription, ingredientPrice, ingredientCategory, ingredientStockQty, ingredientImg, ingredientImgAlt)
        await setShowAddForm(false)
    }

    const handleButtonCancel = () => {

        setShowAddForm(false)
    }
    return (
        <>
            <div className="add-product-container">
                <div className='add-form-card'>
                    <div className="form-image">
                        <img src="/images/cs.png" alt="salesman" height="400" width="auto" />
                    </div>
                    <div className="form-right-info">
                        <h1>Create A New Product</h1>

                        <form onSubmit={HandleFormSubmit}
                            className="form-container">
                            <div className="form-inputs">
                                <label>
                                    <div className="left-lable">Name</div>
                                    <input
                                        name="Product Name"
                                        placeholder="Name"
                                        value={ingredientName}
                                        onInput={(event) => {
                                            setIngredientName(event.target.value)
                                        }}
                                        required />
                                </label>
                                <br />
                                <label className='Description'>
                                    <div className="left-lable">Discription</div>
                                    <input
                                        name="Description"
                                        placeholder="Description"
                                        value={ingredientDescription}
                                        onInput={(event) => {
                                            setIngredientDescription(event.target.value)
                                        }}
                                        required />
                                </label>
                                <br />
                                <label className='Price'>
                                    <div className="left-lable">Price</div>
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
                                    <div className="left-lable">Category</div>
                                    <input
                                        name="Category"
                                        placeholder="Category"
                                        value={ingredientCategory}
                                        onInput={(event) => {
                                            setIngredientCategory(event.target.value)
                                        }}
                                        required />
                                </label>
                                <br />
                                <label className='stock-qty'>
                                    <div className="left-lable">Stock Quantity</div>
                                    <input
                                        name="Stock"
                                        placeholder="Stock Quantity"
                                        value={ingredientStockQty}
                                        onInput={(event) => {
                                            setIngredientStockQty(event.target.value)
                                        }}
                                        required />
                                </label>
                                <br />
                                <label className='add-image'>
                                    <div className="left-lable">Image URL</div>
                                    <input
                                        name="image"
                                        placeholder="Image URL"
                                        value={ingredientImg}
                                        onInput={(event) => {
                                            setIngredientImg(event.target.value)
                                        }}
                                        required />
                                </label>
                                <br />
                                <label className='add-alt-tag'>
                                    <div className="left-lable">Alt Tag</div>
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
                            <div className='add-form-buttons'>
                                <Button type='submit' className='ingredient-add'>Submit</Button>

                                <Button className='ingredient-add-cancel' onClick={handleButtonCancel}>Cancel</Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
};

export default AdminAddProduct;