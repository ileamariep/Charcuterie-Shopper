import React, { useState } from 'react'

import "./Shop.css";
import { getSingleIngredient } from "../api"

const Shop = ({ grabbedIngredients, setIngredients, resetIngredients, setResetIngredients }) => {

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
    setIngredients(resetIngredients)
  }

  return (
    <>

      <div id="product-container">

        {grabbedIngredients.map(({ id,
          name,
          description,
          price,
          category,
          quantity,
          img,
          imgAlt
        }) => (
          <div key={id} className="product-card">

            <div className="image-container">
              {img ? (<img src={img} alt={imgAlt} height="200" width="100" />) :
                (<img src="images/default.png" alt="defualt" height="200" width="100" />)}
            </div>
            <div className="product-info">
              <h1 className='product-name'>{name}</h1>
              <h2 className='product-category'>{category}</h2>
              <p className='product-description'>{description}</p>
            </div>
            <div className='product-price-butn'>
              <div className='product-price'>{price}</div>
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

