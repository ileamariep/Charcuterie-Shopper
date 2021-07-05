import React, { useState } from "react";
import "./Admin.css";
import "./Shop.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

import { deleteIngredient } from "../api/ingredients"
import { TextField } from "@material-ui/core";
// import { deleteCartItem, getUsersCurrentCartItems } from "../api/cartItem"

// import { getSomething } from "../api";

const AdminEdit = ({ grabbedIngredients: { id, name, description, price, category, stockQty, img, imgAlt }, reset
}) => {
    const [editMode, setEditMode] = useState(false);
    const [ingredientName, setIngredientName] = useState(name)
    const [ingredientDescription, setIngredientDescription] = useState(description)
    const [ingredientPrice, setIngredientPrice] = useState(price)
    const [ingredientCategory, setIngredientCategory] = useState(category)
    const [ingredientStockQty, setIngredientStockQty] = useState(stockQty)

    const handleEditClick = () => {
        setEditMode(true);
    };


    const handleDelete = (id) => {
        console.log(id, "this should be the id")
        deleteIngredient(id)

    }

    const handleSaveClick = (id) => {
        setEditMode(false)
        console.log(id, 'this is the ingredient ID', ingredientDescription, 'description', ingredientPrice)
        fetch(
            `/api/ingredients/ingredient/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: ingredientName,
                description: ingredientDescription,
                price: ingredientPrice,
                category: ingredientCategory,
                stockQty: ingredientStockQty,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch(console.error);

    }

    return (
        <>
            <div id="product-container">

                <div key={id} className="product-card">

                    <>
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

                                <div className="product-name">
                                    {editMode ? (
                                        <TextField
                                            value={ingredientName}
                                            onChange={(event) => {
                                                setIngredientName(event.target.value);
                                            }}
                                        />
                                    )
                                        : (
                                            name
                                        )
                                    }
                                </div>
                                <h2 className="product-category">

                                    {editMode ? (
                                        <TextField
                                            value={ingredientCategory}
                                            onChange={(event) => {
                                                setIngredientCategory(event.target.value);
                                            }}
                                        />
                                    )
                                        : (
                                            category
                                        )
                                    }</h2>
                            </div>
                            <p>Stock Quantity:</p>
                            <div className="product-description">

                                {editMode ? (
                                    <TextField
                                        value={ingredientDescription}
                                        onChange={(event) => {
                                            setIngredientDescription(event.target.value);
                                        }}
                                    />
                                )
                                    : (
                                        description
                                    )
                                }

                            </div>
                            <div className="product-price">
                                {editMode ? (
                                    <TextField
                                        value={ingredientPrice}
                                        onChange={(event) => {
                                            setIngredientPrice(event.target.value);
                                        }}
                                    />
                                )
                                    : (
                                        price
                                    )
                                }


                            </div>
                            <div className="product-stockQty">
                                {editMode ? (
                                    <TextField
                                        value={ingredientStockQty}
                                        onChange={(event) => {
                                            setIngredientStockQty(event.target.value);
                                        }}
                                    />
                                )
                                    : (
                                        stockQty
                                    )
                                }


                            </div>
                        </div>
                        <div className="admin-product-buttons">
                            <button
                                type="button"
                                className="view"
                                onClick={() => handleEditClick()}
                            >

                                Edit
                            </button>

                            <button
                                className="delete-button"
                                onClick={() => handleDelete(id)}
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => {
                                    handleSaveClick(id);
                                }}>

                                Save
                            </button>

                        </div>
                    </> :

                    {/* //product card div below */}
                </div>

            </div>

        </>
    )
};


export default AdminEdit;