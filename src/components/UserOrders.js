import React, { useEffect, useState } from "react";
import "./Admin.css";
import { TableRow, TableCell } from "@material-ui/core";
import { getUsersOrderHistory } from "../api/orders";

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
      <ul>
        {cartItems.map((item) => {
          return (
            <li key={item.id}>
              <TableCell align="left">
                <div key={item.name}>Item Name:{item.name}</div>
                <div key={item.quantity}>Item Quantity:{item.quantity}</div>
                <div key={item.price}>Item Price:{item.price}</div>
              </TableCell>
            </li>
          );
        })}
      </ul>
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
