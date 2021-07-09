import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { getUsersOrderHistory } from "../api/orders";
import "./UsersOrders.css";

const UserOrders = ({ currentUserId, setOrderHistory, orderHistory }) => {
  // const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken && currentUserId) {
      getUsersOrderHistory(currentUserId).then(setOrderHistory);
    }
  }, []);

  const getItemContainer = (cartItems) => {
    return (
      <>
        {cartItems.map((item) => {
          return (
            <div className="single-item-container-user" key={item.id}>
              <div className="item-name-container with-line">
                <div className="single-item-header" key={item.name}>
                  Item Name
                </div>
                <div className="single-item-name detail-text">{item.name}</div>
              </div>
              <div className="item-qty-container with-line">
                <div className="single-item-header" key={item.quantity}>
                  Item Quantity
                </div>
                <div className="single-item-qty detail-text">
                  {item.quantity}
                </div>
              </div>
              <div className="item-price-container with-line">
                <div className="single-item-header" key={item.price}>
                  Item Price
                </div>
                <div className="single-item-qty detail-text">${item.price}</div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      {/* <h1>Order History</h1> */}
      {/* <TableRow> */}
      {orderHistory.map((orderItem) => {
        return (
          <div id="order-history-container-users">
            <div key={orderItem.id}>
              <div id="order-users-container" key={orderItem.id}>
                {/* <TableCell align="center"> */}
                <div className="order-id-container">
                  <div className="dark-background">Order ID</div>
                  <div>{orderItem.id}</div>
                </div>
                {/* </TableCell> */}
                {/* <TableCell align="center"> */}
                <div className="total-price-container">
                  <div className="dark-background">Order Total</div>
                  <div> ${orderItem.totalPrice}</div>
                </div>
                {/* </TableCell> */}
                {/* <TableCell align="center"> */}
                <div className="date-ordered-container">
                  <div className="dark-background"> Date Ordered</div>
                  <div>{orderItem.date}</div>
                </div>
                {/* </TableCell> */}
                <div>
                  {/* <TableCell align="left"> */}
                  <div className="items-ordered-container-user">
                    <div className="items-ordered-title-user">
                      Items Ordered
                    </div>
                    <div className="items-ordered-list-user">
                      {getItemContainer(orderItem.items)}
                    </div>
                  </div>
                  {/* </TableCell> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* </TableRow> */}
      {/* </div> */}
    </>
  );
};

export default UserOrders;
