import React from "react";
import "./Cart.css";
import Button from "react-bootstrap/Button";
// import { getSomething } from "../api";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className='cart-card'>
        <div className='cart-info'>
          <div className='cart-info-title'>
            <h1>This will be the map for the cart items</h1>
          </div>

          <Button
            type="submit"
            className="editcart"
          // onClick={() => )}
          >
            Edit Cart
          </Button>
        </div>

        <div className='checkout-section'>
          <h1><h1>This will be the checkout side</h1></h1>
          <Button
            type="submit"
            className="checkcout"
          // onClick={() => )}
          >
            Checkout
          </Button>

        </div>

      </div>

    </div>
  );
};

export default Cart;
