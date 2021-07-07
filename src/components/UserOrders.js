import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { getUsersOrderHistory } from "../api/orders";
import "./UserOrders.css";

const UserOrders = ({ currentUserId }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken && currentUserId) {
      getUsersOrderHistory(currentUserId).then(setOrderHistory);
    }
  }, []);

  const getItemContainer = (cartItems) => {
    return (
      <>
        <ul>
          {cartItems.map((item) => {
            return (
              <li key={item.id}>
                <TableCell align="left">
                  <div key={item.name}>Item:{item.name}</div>
                  <div key={item.quantity}>Quantity:{item.quantity}</div>
                  <div key={item.price}>Price:{item.price}</div>
                </TableCell>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <div id="order-history-container" align="center">
        <h1>Order History</h1>
        <TableRow>
          {orderHistory.map((orderItem) => {
            return (
              <div key={orderItem.id}>
                <TableCell align="center">
                  Order ID
                  <div>{orderItem.id}</div>
                </TableCell>
                <TableCell align="center">
                  Order Total
                  <div> ${orderItem.totalPrice}</div>
                </TableCell>
                <TableCell align="center">
                  Date Ordered
                  <div>{orderItem.date}</div>
                </TableCell>
                <div>
                  <TableCell align="left">
                    Items Ordered:
                    <div>{getItemContainer(orderItem.items)}</div>
                  </TableCell>
                </div>
              </div>
            );
          })}
        </TableRow>
      </div>
    </>
  );
};

export default UserOrders;
