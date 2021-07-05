import React, { useState } from "react";
import "./Shop.css";
import Dropdown from "./Dropdown";
import Shop from "./Shop"
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { addCartItem } from "../api/cartItem";

const SingleProductView = ({ singleIngredient, ingredientId, grabbedIngredients, currentUserId, setIngredients }
) => {
    const [selection, setSelection] = useState([]);
    const [showQtyButton, setShowQtyButton] = useState(true);
    const [showCartButton, setCartButton] = useState(false);
    const [keepShoppingClicked, setKeepShopping] = useState(false)
    const items = [
        {
            id: 4,
            qty: 1,
        },
        {
            id: 5,
            qty: 2,
        },
        {
            id: 6,
            qty: 3,
        },
    ];
    const handleKeepShopping = () => {
        setSelection([]);
        setKeepShopping(true)
        window.location.reload();
        setIngredients(grabbedIngredients)
    };

    const handleAddToCart = async (qtySelect, ingredientId, currentUserId) => {
        const numOutOfArray = qtySelect.toString();
        const qtyStringToNum = Number(numOutOfArray);
        setShowQtyButton(false)
        setCartButton(false)

        try {
            await addCartItem(qtyStringToNum, ingredientId, currentUserId);
        } catch (error) {
            throw error;
        }
    };
    return (
        <>
            {keepShoppingClicked ? (
                <Shop />

            ) : (
                <>
                    <div id="product-container" >

                        <div className="product-card">
                            <div className="image-container" >
                                {singleIngredient.img ? (
                                    <img src={singleIngredient.img} alt={singleIngredient.imgAlt} height="200" width="100" />
                                ) : (
                                    <img
                                        src="images/default.png"
                                        alt="defualt"
                                        height="200"
                                        width="100"
                                    />
                                )}
                            </div>
                            <div className="product-info">
                                <div className="product-title">
                                    <h1 className="product-name">{singleIngredient.name}</h1>
                                    <button className="product-category"
                                    // onClick={() => {
                                    //     handleCategoryClick(category);
                                    // }}
                                    >{singleIngredient.category}</button>
                                </div>
                                <p className="product-description">{singleIngredient.description}</p>

                                <div className="product-price">{singleIngredient.price}</div>

                                <div className="product-buttons">
                                    {showQtyButton ?
                                        (<>
                                            <div className='select-qty-message'>Select Quantity to Add to Cart</div>
                                            <Dropdown
                                                title="Select qty"
                                                selection={selection}
                                                setSelection={setSelection}
                                                setShowQtyButton={setShowQtyButton}
                                                setCartButton={setCartButton}
                                                items={items}
                                                multiSelect
                                            />
                                        </>)

                                        : showCartButton ?

                                            (<>   <div className="product-qty-selected">{selection} selected</div>
                                                <Button
                                                    type="submit"
                                                    className="addcart"
                                                    onClick={() =>
                                                        handleAddToCart(selection, singleIngredient.id, currentUserId)
                                                    }
                                                >
                                                    Add to Cart
                                                </Button>

                                            </>)
                                            :
                                            (
                                                <>
                                                    <div className="items-added-cart">{selection} ITEM(S) ADDED TO YOUR CART</div>
                                                    <Button
                                                        type="button"
                                                        className="keep-shopping"
                                                    // onClick={() => handleKeepShopping()}
                                                    >
                                                        Go to Cart
                                                    </Button>
                                                </>
                                            )
                                    }

                                    <Button
                                        type="button"
                                        className="keep-shopping"
                                        onClick={() => handleKeepShopping()}
                                    >
                                        Keep Shopping
                                    </Button>

                                    {/* //product button ends below */}
                                </div>
                            </div>
                        </div>


                    </div>
                </>
            )}
        </>
    );
};

export default SingleProductView;