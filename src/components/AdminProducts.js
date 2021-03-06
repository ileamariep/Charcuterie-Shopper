import React, { useState } from "react";
import "./Admin.css";
import "./Shop.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import AdminEdit from "./AdminEdit";
import AdminAddProduct from "./AdminAddProduct";
const AdminProducts = ({
  grabbedIngredients,
  setIngredients,
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
  reset,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  return (
    <>
      {showAddForm ? (
        <AdminAddProduct
          setShowAddForm={setShowAddForm}
          key={grabbedIngredients.id}
          setIngredients={setIngredients}
          grabbedIngredients={grabbedIngredients}
          ingredientName={ingredientName}
          setIngredientName={setIngredientName}
          ingredientDescription={ingredientDescription}
          setIngredientDescription={setIngredientDescription}
          ingredientPrice={ingredientPrice}
          setIngredientPrice={setIngredientPrice}
          ingredientCategory={ingredientCategory}
          setIngredientCategory={setIngredientCategory}
          ingredientStockQty={ingredientStockQty}
          setIngredientStockQty={setIngredientStockQty}
          ingredientImg={ingredientImg}
          setIngredientImg={setIngredientImg}
          ingredientImgAlt={ingredientImgAlt}
          setIngredientImgAlt={setIngredientImgAlt}
          reset={reset}
        />
      ) : (
        <>
          <div className="add-but-container">
            <Button
              style={{
                color: "black",
                backgroundColor: "rgb(243, 113, 113)",
              }}
              onClick={handleAddButtonClick}
              className="button-add"
            >
              Add Product
            </Button>
          </div>
          <div id="product-container">
            {grabbedIngredients.map((grabbedIngredients) => (
              <AdminEdit
                key={grabbedIngredients.id}
                grabbedIngredients={grabbedIngredients}
                setIngredients={setIngredients}
                reset={reset}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default AdminProducts;
