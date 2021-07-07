import React, { useState, useEffect } from "react";
import "./Cart.css";
import Button from "react-bootstrap/Button";
import {
  addOrderIdToCartItems,
  deleteCartItem,
  getUsersCurrentCartItems,
} from "../api/cartItem";
import { addOrder } from "../api/orders";



const Cart = ({ currentUserId }) => {
  const [myCartItems, setMyCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(100);
  const [orderStatus, setOrderStatus] = useState("Processing");
  const [orderId, setOrderId] = useState();

  const retrieveCartItems = () => {
    getUsersCurrentCartItems(currentUserId)
      .then((cartItems) => {
        setMyCartItems(cartItems);
      })
      .catch((error) => {
        throw error;
      });
  };

  const retrieveOrderId = async () => {
    addOrder(totalPrice, orderStatus)
      .then(({ id }) => {
        setOrderId(id);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    const fetchCartItems = () => {
      retrieveCartItems();
    };
    fetchCartItems();
  }, []);

  const createOrder = async () => {
    await retrieveOrderId();
    Promise.all(
      myCartItems.map((cartItem) => {
        return addOrderIdToCartItems(cartItem.id, orderId);
      })
    );
  };


  const deleteSelectedCartItem = async (id) => {
    console.log(id, "this is cartItems id")
    await deleteCartItem(id)
  }

  return (


    <div className="cart-container">
      <div className="cart-card">
        <div className="cart-info">
          <div className="cart-info-title">
            <>
              {myCartItems.map(({ id, name, description, price, quantity }) => (
                <div key={id} className="cart-cards">
                  <div className="cart-card">
                    <div className="card-name">
                      <b>Name:</b>
                      <p>{name}</p>
                    </div>
                    <div className="card-description">
                      <b>Description:</b>
                      <p>{description}</p>
                    </div>
                    <div className="card-name">
                      <b>Price:</b>
                      <p>{price}</p>
                    </div>
                    <div className="card-name">
                      <b>Quantity:</b>
                      <p>{quantity}</p>
                    </div>
                    <Button onClick={() => deleteSelectedCartItem(id)}>Remove From Cart</Button>

                  </div>
                </div>
              ))}
            </>
          </div>

          {/* <Button
            type="button"
            className="editcart"
            // onClick={() => )}
          >
            Edit Cart
          </Button> */}
        </div>

        <div className="checkout-section">
          <h1>
            <h1>This will be the checkout side</h1>
          </h1>
          <Button
            className="checkout"
            onClick={async () => await createOrder()}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
