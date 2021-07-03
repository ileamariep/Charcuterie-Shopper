import React, { useState } from "react";
import "./Admin.css";
import "./Shop.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import { deleteIngredient } from "../api/ingredients"
// import { deleteCartItem, getUsersCurrentCartItems } from "../api/cartItem"

// import { getSomething } from "../api";

const AdminEdit = ({
    resetIngredients: { id, name, description, price, category, img, imgAlt }, setIngredients, resetIngredients, ingredientName, ingredientDescription, ingredientPrice, ingredientCategory, ingredientStockQty, ingredientImg, ingredientImgAlt, setIngredientName,
    setIngredientDescription,
    setIngredientPrice,
    setIngredientCategory,
    setIngredientStockQty,
    setIngredientImg,
    setIngredientImgAlt }) => {
    const [editMode, setEditMode] = useState(false);






    const onEdit = () => {
        setEditMode(true);
    };


    const handleDelete = (id) => {
        deleteIngredient(id)
        setIngredients(resetIngredients)
        window.location.reload();
    }

    const handleEditClick = (id) = {

    }

    const handleSaveClick = (id) = {

    }


    return (
        <>
            <div id="product-container">

                <div key={id.name} className="product-card">
                    <div className="image-container">
                        {img ? (
                            <img src={window.location.origin + img} alt={imgAlt} height="200" width="100" />
                        ) : (
                            <img
                                src="/images/default.png"
                                alt="defualt"
                                height="200"
                                width="100"
                            />
                        )}
                    </div>
                    <div className="product-info">
                        <div className="product-title">
                            <h1 className="product-name">{name}</h1>
                            <h2 className="product-category">{category}</h2>
                        </div>
                        <p className="product-description">{description}</p>
                        <div className="product-price">{price}</div>
                    </div>
                    <div className="admin-product-buttons">
                        <button
                            type="button"
                            className="view"
                            onClick={() => handleEditClick(id)}
                        >

                            Edit
                        </button>
                        <button
                            type="button"
                            className="view"
                            onClick={() => handleSaveClick(id)}
                        >

                            Save
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
};


export default AdminEdit;