import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Shop.css";
import { getSingleIngredient } from "../api";
import { addCartItem } from "../api/cartItem";
import { selectCategory } from "../api/ingredients";
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
  reset,
  currentUserId,
}) => {

  const [selection, setSelection] = useState([]);
  const [hideViewButton, setHideViewButton] = useState(true)
  const [showQtyButton, setShowQtyButton] = useState(false);
  const [showCartButton, setCartButton] = useState(false);

  const [category, setCategory] = useState('');


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
    reset()
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (category === 'All') {
        reset()
      } else {
        const categoryResults = await selectCategory(category);
        setIngredients(categoryResults)
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    setCategory(event.target.value);
  };

  return (
    <>
      {hideViewButton ? (<form onSubmit={handleSubmit}>
        <label>
          Select a category:
          <select value={category} onChange={handleChange}>
            <option value="All" defaultValue>All</option>
            <option value="pets">Pets</option>
            <option value="general">General</option>
            <option value="beauty">Weightloss</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>) : (null)}

      <div id="product-container" >
        {grabbedIngredients.map(
          ({ id, name, description, price, category, stockQty, img, imgAlt }) => (
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
                {stockQty > 0 ? (<div className="product-stock">In Stock</div>) : (<div className="product-stock">Out of Stock</div>)}


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