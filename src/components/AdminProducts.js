import React, { useState } from "react";
import "./Admin.css";
import "./Shop.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import AdminEdit from "./AdminEdit";

import { addAnIngredient } from "../api/ingredients";

const AdminProducts = ({
  grabbedIngredients,
  setIngredients,
  resetIngredients,
  setResetIngredients,
  ingredientName,
  ingredientDescription,
  ingredientPrice,
  ingredientCategory,
  ingredientStockQty,
  ingredientImg,
  ingredientImgAlt,
  setIngredientName,
  setIngredientDescription,
  setIngredientPrice,
  setIngredientCategory,
  setIngredientStockQty,
  setIngredientImg,
  setIngredientImgAlt,
}) => {
  const HandleFormSubmit = (event) => {
    event.preventDefault();
    addAnIngredient(
      ingredientName,
      ingredientDescription,
      ingredientPrice,
      ingredientCategory,
      ingredientStockQty,
      ingredientImg,
      ingredientImgAlt
    );
  };
  return (
    <>
      <button>Add Product</button>
      <div className="form-container">
        <form onSubmit={HandleFormSubmit}>
          <h1>Create A New Product</h1>
          <br />

          <label>
            <h3>Name</h3>
            <input
              name="Product Name"
              value={ingredientName}
              onInput={(event) => {
                setIngredientName(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <label className="Description">
            <h3>Description</h3>
            <input
              name="Description"
              value={ingredientDescription}
              onInput={(event) => {
                setIngredientDescription(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <label className="Price">
            <h3>Price</h3>
            <input
              name="Price"
              value={ingredientPrice}
              onInput={(event) => {
                setIngredientPrice(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <label className="Category">
            <h3>Category</h3>
            <input
              name="Category"
              value={ingredientCategory}
              onInput={(event) => {
                setIngredientCategory(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <label className="stock-qty">
            <h3>Stock Quantity</h3>
            <input
              name="Stock"
              value={ingredientStockQty}
              onInput={(event) => {
                setIngredientStockQty(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <label className="add-image">
            <h3>Image URL</h3>
            <input
              name="image"
              value={ingredientImg}
              onInput={(event) => {
                setIngredientImg(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <label className="add-alt-tag">
            <h3>Image Alt Tag</h3>
            <input
              name="image-alt"
              value={ingredientImgAlt}
              onInput={(event) => {
                setIngredientImgAlt(event.target.value);
              }}
              required
            />
          </label>
          <br />
          <button type="submit" className="ingredient-add">
            Submit
          </button>
        </form>
      </div>
      <div id="product-container">
        {resetIngredients.map((resetIngredients) => (
          <AdminEdit
            key={resetIngredients.id}
            resetIngredients={resetIngredients}
            setIngredients={setIngredients}
            grabbedIngredients={grabbedIngredients}
            setResetIngredients={setResetIngredients}
          />
        ))}
      </div>
    </>
  );
};

export default AdminProducts;
