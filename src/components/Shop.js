import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Shop.css";
import { getSingleIngredient, updateCount } from "../api";
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
}) => {
  const [showCartButton, setCartButton] = useState(false);
  const [selection, setSelection] = useState([]);

  const handleViewClick = async (id) => {
    try {
      let ingredientResult = await getSingleIngredient(id);
      const ingredientArray = [ingredientResult].flat();
      setIngredients(ingredientArray);
      setCartButton(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeepShopping = () => {
<<<<<<< HEAD
    setCartButton(false)
=======
    setCartButton(false);
    setIngredients(resetIngredients);
>>>>>>> a5e1d697b5a9e222899f16bd6b67e8cb84af964e
    window.location.reload();
  };

  const handleAddToCart = async (id, qytSelection) => {
    try {
      const qtyToString = qytSelection.toString();
      const qtyStringToNum = Number(qtyToString);
      await updateCount(id, qtyStringToNum);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div id="product-container">
        {grabbedIngredients.map(
          ({ id, name, description, price, category, img, imgAlt }) => (
            <div key={id} className="product-card">
              <div className="image-container">
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

                {showCartButton ? (
                  <Dropdown
                    title="Select movie"
                    selection={selection}
                    setSelection={setSelection}
                    items={items}
                    multiSelect
                  />
                ) : null}
                <div className="product-price">{price}</div>
                <div className="product-buttons">
                  {!showCartButton ? (
                    <Button
                      type="submit"
                      className="view"
                      onClick={() => handleViewClick(id)}
                    >
                      View
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        className="addcart"
                        onClick={() => handleAddToCart(id, selection)}
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
                  )}
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
