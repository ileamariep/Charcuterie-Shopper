import React, { useState } from 'react'

import "./Shop.css";
import { getSingleIngredient } from "../api"

const Shop = ({ grabbedIngredients, setIngredients, reset }) => {

  const [showCartButton, setCartButton] = useState(false)

  const handleViewClick = async (id) => {
    console.log(id, 'this is the Id');
    try {
      let ingredientResult = await getSingleIngredient(id);
      console.log(ingredientResult, "this is the returned ingredient but it's an object, so it can't be mapped");

      const ingredientArray = [ingredientResult].flat()

      console.log(ingredientArray, 'the ingredient array in click handler - it works, this can be mapped')

      setIngredients(ingredientArray);
      setCartButton(true)
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeepShopping = () => {
    setCartButton(false)
    reset();
  }

  return (
    <>
      <div className='page-head'><h1>Ingredients</h1></div>
      <div id="ingredient-container">

        {grabbedIngredients.map(({ id,
          name,
          description,
          price,
          category,
          quantity
        }) => (
          <div key={id} className="routine-cards">
            <div className="card">
              <div className='card-name'>Name: {name}</div>
              <div className='card-goal'>Description:{description}</div>
              <div className='card-goal'>Price: {price}</div>
              <div className='card-goal'>Category: {category}</div>
              <div>Qty:{quantity}</div>
              <div>Ing Id:{id}</div>

              {!showCartButton ? <button
                type="button"
                className="view-btn"
                onClick={() => handleViewClick(id)}
              >
                View Product
              </button>
                :
                <>
                  <button
                    type="button"
                    className="edit-btn"
                  // onClick={() => handleViewClick(id)}
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className="keep-shopping-btn"
                    onClick={() => handleKeepShopping()}
                  >
                    Keep Shopping
                  </button>
                </>
              }
            </div>
          </div>
        ))}
      </div>

    </>

  )
}

export default Shop;

