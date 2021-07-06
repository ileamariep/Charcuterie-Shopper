import React, { useState } from "react";
import "./Admin.css";
import "./Shop.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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


    const handleDelete = async (id) => {
        console.log(id, "this should be the id")
        await deleteIngredient(id)
        await reset()

    }

    const handleSaveClick = async (id) => {
        await setEditMode(false)
        await fetch(
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


            <div key={id} className="admin-product-card">

                <>
                    <div className="admin-image-container">
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
                    <div className="admin-product-info">
                        <div className="product-title">

                            <div className="admin-product-name">
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
                            <h2 className="admin-product-category">

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

                        <div className="admin-product-description">

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
                        <div className="admin-product-price">
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
                        <div className="admin-product-stockQty">

                            {editMode ? (
                                <>
                                    <TextField
                                        value={ingredientStockQty}
                                        onChange={(event) => {
                                            setIngredientStockQty(event.target.value);
                                        }}
                                    />
                                </>
                            )
                                : (
                                    <div>Stock qty:  {stockQty}</div>
                                )
                            }


                        </div>
                    </div>
                    <div className="admin-product-buttons">
                        {editMode ? (
                            <>
                                <Button
                                    onClick={() => {
                                        handleSaveClick(id);
                                    }}
                                    className="save-button admin-edit"
                                >

                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    className="edit-button admin-edit"
                                    onClick={() => handleEditClick()}
                                >

                                    Edit
                                </Button>
                            </>
                        )}

                        <Button
                            className="delete-button admin-edit"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </Button>



                    </div>
                </>

                {/* //product card div below */}
            </div>



        </>
    )
};


export default AdminEdit;