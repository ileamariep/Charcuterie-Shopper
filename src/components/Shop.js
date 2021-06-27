import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
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
            <div className='product-info'>
              <div className='product-title'>
                <h1 className='product-name'>{name}</h1>
                <h2 className='product-category'>{category}</h2>
              </div>
              <p className='product-description'>{description}</p>

              {showCartButton ? <p className='quantity-select'>Select Quatity</p> :
                null}
              <div className='product-price'>{price}</div>
              <div className="product-buttons">
                {!showCartButton ? <Button
                  type="submit"
                  className="view"
                  onClick={() => handleViewClick(id)}
                >
                  View
                </Button>
                  :
                  <>
                    <Button
                      type="submit"
                      className="addcart"
                    // onClick={() => handleViewClick(id)}
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
                }
              </div>
            </div>
          </div>
        ))}

      </div>

    </>

  )
}

export default Shop;

