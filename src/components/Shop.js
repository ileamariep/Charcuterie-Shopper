import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Shop.css";
import { getSingleIngredient } from "../api";
import { addCartItem } from "../api/cartItem";
import Dropdown from "./Dropdown";

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

const Shop = ({
  grabbedIngredients,
  setIngredients,
  resetIngredients,
  setResetIngredients,
  currentUserId,
}) => {

  const [selection, setSelection] = useState([]);
  const [hideViewButton, setHideViewButton] = useState(true)
  const [showQtyButton, setShowQtyButton] = useState(false);
  const [showCartButton, setCartButton] = useState(false);




  const handleViewClick = async (id) => {
    try {
      let ingredientResult = await getSingleIngredient(id);
      const ingredientArray = [ingredientResult].flat();
      setIngredients(ingredientArray);
      setHideViewButton(false)
      setShowQtyButton(true)
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeepShopping = () => {
    setCartButton(false);
    setSelection([]);
    window.location.reload();
  };

  const handleAddToCart = async (qtySelect, ingredientId, currentUserId) => {
    const numOutOfArray = qtySelect.toString();
    const qtyStringToNum = Number(numOutOfArray);
    setHideViewButton(false)
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
      <div id="product-container" >
        {grabbedIngredients.map(
          ({ id, name, description, price, category, img, imgAlt }) => (
            <div key={id} className="product-card">
              <div className="image-container" >
                {img ? (
                  <img src={img} alt={imgAlt} height="200" width="100" />
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
                  <h1 className="product-name">{name}</h1>
                  <h2 className="product-category">{category}</h2>
                </div>
                <p className="product-description">{description}</p>

                <div className="product-price">{price}</div>

                <div className="product-buttons">
                  {hideViewButton ? <>
                    <Button
                      type="submit"
                      className="view"
                      onClick={() => handleViewClick(id)}
                    >
                      View
                    </Button>
                  </>
                    : showQtyButton ?
                      <>
                        <div className='select-qty-message'>Select Quantity to Add to Cart</div>
                        <Dropdown
                          title="Select movie"
                          selection={selection}
                          setSelection={setSelection}
                          setShowQtyButton={setShowQtyButton}
                          setCartButton={setCartButton}
                          items={items}
                          multiSelect
                        />

                        <Button
                          type="button"
                          className="keep-shopping"
                          onClick={() => handleKeepShopping()}
                        >
                          Keep Shopping
                        </Button>

                      </>
                      : showCartButton ?
                        <>
                          <div className="product-qty-selected">{selection} selected</div>
                          <Button
                            type="submit"
                            className="addcart"
                            onClick={() =>
                              handleAddToCart(selection, id, currentUserId)
                            }
                          >
                            Add to Cart
                          </Button>

                          <Button
                            type="button"
                            className="keep-shopping"
                            onClick={() => handleKeepShopping()}
                          >
                            Keep Shopping
                          </Button>
                        </>
                        :
                        <>
                          <div className="items-added-cart">{selection} ITEM(S) ADDED TO YOUR CART</div>
                          <Button
                            type="button"
                            className="keep-shopping"
                            onClick={() => handleKeepShopping()}
                          >
                            Keep Shopping
                          </Button>
                          <Button
                            type="button"
                            className="keep-shopping"
                            onClick={() => handleKeepShopping()}
                          >
                            Go to Cart
                          </Button>
                        </>
                  }
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
export default Shop;
