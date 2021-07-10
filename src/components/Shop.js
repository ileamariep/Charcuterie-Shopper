import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Shop.css";
import { getSingleIngredient } from "../api";
import { addCartItem } from "../api/cartItem";
import { selectCategory, updateCount } from "../api/ingredients";
const Shop = ({
  grabbedIngredients,
  setIngredients,
  reset,
  currentUserId,
  hideViewButton,
  setHideViewButton,
  showQtyButton,
  setShowQtyButton,
  showCartButton,
  setCartButton,
}) => {
  const [selection, setSelection] = useState(1);
  const [category, setCategory] = useState("");
  const handleViewClick = async (id) => {
    try {
      let ingredientResult = await getSingleIngredient(id);
      const ingredientArray = [ingredientResult].flat();
      setIngredients(ingredientArray);
      setHideViewButton(false);
      setShowQtyButton(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeepShopping = () => {
    setCartButton(false);
    setSelection(0);
    reset();
    window.location.reload();
  };
  const handleAddToCart = async (qtySelect, ingredientId, currentUserId) => {
    const numOutOfArray = qtySelect.toString();
    const qtyStringToNum = Number(numOutOfArray);
    setHideViewButton(false);
    setShowQtyButton(false);
    setCartButton(false);
    try {
      await addCartItem(qtyStringToNum, ingredientId, currentUserId);
      await updateCount(ingredientId, qtySelect);
    } catch (error) {
      throw error;
    }
  };
  const handleCatSubmit = async (event) => {
    event.preventDefault();
    try {
      if (category === "All" || category === "header") {
        reset();
      } else {
        const categoryResults = await selectCategory(category);
        setIngredients(categoryResults);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = async (event) => {
    setCategory(event.target.value);
  };
  return (
    <>
      {hideViewButton ? (
        <div className="category-container">
          <form onSubmit={handleCatSubmit}>
            <select value={category} onChange={handleChange}>
              <option value="header" defaultValue>
                Select Category
              </option>
              <option value="All">All</option>
              <option value="Cold">Cold/Flu</option>
              <option value="General">General Health</option>
              <option value="Pets">Pets</option>
              <option value="Romance">Romance</option>
            </select>
            <input
              type="submit"
              value="Submit"
              className="category-submit"
              style={{ textAlign: "center" }}
            />
          </form>
        </div>
      ) : null}
      <div id="product-container">
        {grabbedIngredients.map(
          ({
            id,
            name,
            description,
            price,
            category,
            stockQty,
            img,
            imgAlt,
          }) => (
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
              {currentUserId ? (

                <div className="product-info">
                  <div className="product-title">
                    <h1 className="product-name">{name}</h1>
                    <h2 className="product-category">{category}</h2>
                  </div>
                  <p className="product-description">{description}</p>
                  <div className="product-price">${price}</div>
                  {stockQty > 0 ? (
                    <div className="product-stock">In Stock</div>
                  ) : (
                    <div className="product-stock">Out of Stock</div>
                  )}
                  <div className="product-buttons">
                    {hideViewButton ? (
                      <>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "rgb(243, 113, 113)",
                          }}
                          type="submit"
                          className="view-button"
                          onClick={() => handleViewClick(id)}
                        >
                          View
                        </Button>
                      </>
                    ) : showQtyButton ? (
                      <>
                        <div className="product-quantity-container">
                          <div className="quantity-head">Quantity</div>
                          <div className="product-quantity">{selection}</div>
                          <ControlPointIcon
                            fontSize="medium"
                            className="product-add-item"
                            onClick={() => setSelection(selection + 1)}
                          />
                          {selection < 2 ? null : (
                            <RemoveCircleOutlineIcon
                              fontSize="medium"
                              className="product-remove-item"
                              onClick={() => setSelection(selection - 1)}
                            />
                          )}
                        </div>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "rgb(243, 113, 113)",
                          }}
                          type="submit"
                          className="addcart"
                          onClick={() =>
                            handleAddToCart(selection, id, currentUserId)
                          }
                        >
                          Add to Cart
                        </Button>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "rgb(243, 113, 113)",
                          }}
                          type="button"
                          className="keep-shopping"
                          onClick={() => handleKeepShopping()}
                        >
                          Keep Shopping
                        </Button>
                      </>
                    ) : showCartButton ? (
                      <>
                        <div className="product-qty-selected">
                          {selection} selected
                        </div>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "rgb(243, 113, 113)",
                          }}
                          type="button"
                          className="keep-shopping"
                          color="black"
                          onClick={() => handleKeepShopping()}
                        >
                          Keep Shopping
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="items-added-cart">
                          {selection} ITEM(S) ADDED TO YOUR CART
                        </div>
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "rgb(243, 113, 113)",
                          }}
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
              ) : (
                <div className="home-info-right-shop">
                  <div className="log-or-reg-shop">
                    <h2>
                      <Link to={LOGIN_ROUTE}>Login</Link> or{" "}
                      <Link to={REGISTER_ROUTE}>Register</Link> for an account to start shoping.
                    </h2>
                  </div>

                </div>

              )
              }
              {/* end of product info div above */}
            </div>
          )
        )}
      </div>
    </>
  );
};
export default Shop;
