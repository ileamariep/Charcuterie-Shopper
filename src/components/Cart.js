import React, { useState, useEffect } from "react";
import "./Cart.css";
import Button from "react-bootstrap/Button";
import { Delete as DeleteIcon } from "@material-ui/icons";
import {
  addOrderIdToCartItems,
  deleteCartItem,
  getUsersCurrentCartItems,
  updateCartItemsQuantityMinus,
  updateCartItemsQuantityPlus
} from "../api/cartItem";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


import { addOrder } from "../api/orders";



const Cart = ({ currentUserId }) => {
  const [myCartItems, setMyCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(100);
  const [orderStatus, setOrderStatus] = useState("Processing");
  const [orderId, setOrderId] = useState();
  const [cartItemQuantity, setCartItemQuantity] = useState(0);

  const retrieveCartItems = async () => {
    await getUsersCurrentCartItems(currentUserId)
      .then((cartItems) => {
        setMyCartItems(cartItems);
        setCartItemQuantity(cartItems.quantity)
        console.log(cartItems)
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
    retrieveCartItems()
  }

  return (


    <div className="cart-container">
      <div className="cart-header">
        Shopping Cart
      </div>

      <div className="cart-card-container">

        <div className="cart-headers">

          <b>Name</b>
          <b>Description</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Total</b>
          <b>Delete</b>
        </div>

        {myCartItems.map(({ id, name, description, price, quantity }) => (

          <div key={id} className="cart-cards">


            <div className="cart-item-name">

              <p>{name}</p>
            </div>
            <div className="cart-description">

              <p>{description}</p>
            </div>
            <div className="cart-price">

              <p>{price}</p>
            </div>

            <div className="cart-quantity-container">
              <div className='cart-quantity'>

                <p>{quantity}</p>
              </div>
              <ControlPointIcon
                fontSize="small"
                className='cart-add-item'
                onClick={() => {
                  updateCartItemsQuantityPlus(id)
                  retrieveCartItems()
                }}
              />
              <RemoveCircleOutlineIcon
                fontSize="small"
                className='cart-remove-item'
                onClick={() => {
                  updateCartItemsQuantityMinus(id)
                  retrieveCartItems();
                }}
              />
            </div>
            <div className="item-price-total">

              <p>{price}</p>
            </div>

            <div className="cart-delete-container">

              <DeleteIcon

                fontSize="small"
                onClick={() => {
                  deleteSelectedCartItem(id);
                }}
              />
            </div>


          </div>

        ))}

      </div>

      <div className="checkout-section">


        <div className="order-total"><h2>Order total goes here</h2></div>


        <Button
          className="checkout"
          onClick={async () => await createOrder()}
        >
          Checkout
        </Button>
      </div>
    </div>


  );
};

export default Cart;
