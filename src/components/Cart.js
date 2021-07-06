import React, { useState, useEffect } from "react";
import "./Cart.css";
import Button from "react-bootstrap/Button";
import { addOrderIdToCartItems, getUsersCurrentCartItems } from "../api/cartItem";
import { addOrder, getSingleOrder } from "../api/orders";




const Cart = ({ currentUserId }) => {
  const [myCartItems, setMyCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderStatus, setOrderStatus] = useState('')
  const [orderId, setOrderId] = useState()

  const retrieveCartItems = () => {
    getUsersCurrentCartItems(currentUserId)
      .then((cartItems) => {
        setMyCartItems(cartItems)
      })
      .catch((error) => {
        throw error
      })
  }

  const retrieveOrderId = async () => {
    addOrder(totalPrice, orderStatus)
      .then(({ id }) => {
        setOrderId(id)
      })
      .catch((error) => {
        throw error
      })
  }

  useEffect(() => {
    const fetchCartItems = () => {
      retrieveCartItems()
    }
    fetchCartItems()
  }, [])




  const createOrder = async () => {
    setTotalPrice(100)
    setOrderStatus('processing')
    await retrieveOrderId()
    myCartItems.forEach(async (cartItem) => {
      const itemsAddedToCart = await addOrderIdToCartItems(cartItem.id, orderId)
      console.log(itemsAddedToCart)

    });

    await getSingleOrder(orderId)

  }

  return (
    <div className="cart-container">
      <div className="cart-card">
        <div className="cart-info">
          <div className="cart-info-title">
            <div>{myCartItems.map(
              ({
                id,
                name,
                description,
                price,
                quantity,
              }) => (
                <div key={id} className="cart-cards">
                  <div className="cart-card">
                    <div className="card-name">
                      <b>Name:</b><p>{name}</p>
                    </div>
                    <div className="card-description">
                      <b>Description:</b><p>{description}</p>
                    </div>
                    <div className="card-name">
                      <b>Price:</b><p>{price}</p>
                    </div>
                    <div className="card-name">
                      <b>Quantity:</b><p>{quantity}</p>
                    </div>
                  </div>
                </div>
              )
            )}</div>
          </div>

          <Button
            type="submit"
            className="editcart"
          // onClick={() => )}
          >
            Edit Cart
          </Button>
        </div>

        <div className="checkout-section">
          <h1>
            <h1>This will be the checkout side</h1>
          </h1>
          <Button
            className="checkcout"
            onClick={createOrder}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
