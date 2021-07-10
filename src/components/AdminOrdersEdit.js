import React, { useState } from "react";
import "./AdminOrders.css";
import { updateOrderStatus } from "../api/orders";
// import { TableRow, TableCell } from "@material-ui/core";

const AdminOrdersEdit = ({
  allGrabbedOrders,
  setAllOrders,
  theOrderStatus,
  settheOrderStatus,
  resetOrders,
}) => {
  const [status, setStatus] = useState("");
  // const [editOnMode, setEditOnMode] = useState(false)

  // const handleChangeStatusClick = () => {

  //     setEditOnMode(true)
  // }

  const handleChange = async (event) => {
    setStatus(event.target.value);
    console.log(event.target.value, "this is the event");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (status === 'header') {
        return
      } else {
        await updateOrderStatus(allGrabbedOrders.id, status)
        resetOrders()

      }
    } catch (error) {
      console.error(error);
    }

  }

  <div className="order-status-container">
    <div className="dark-background">Order Status</div>
    <div className="order-status detail-text">{allGrabbedOrders.status}</div>
  </div>;

  const getItemContainer = (cartItems) => {
    return (
      <>
        {cartItems.map((item) => {
          return (
            <div className="single-item-container" key={item.id}>
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

  // const handleSaveStatusClick = () => {
  //     console.log(allGrabbedOrders.id, theOrderStatus, "the id and status")
  //     updateOrderStatus(allGrabbedOrders.id, theOrderStatus)
  // }
  return (
    <div id="order-history-container">
      <div id="order-headers-container" key={allGrabbedOrders.id}>
        <div className="order-id-container">
          <div className="dark-background">Order ID</div>
          <div className="order-id detail-text">{allGrabbedOrders.id}</div>
        </div>
        <div className="total-price-container">
          <div className="dark-background">Order Total</div>
          <div className="total-price detail-text">
            {" "}
            ${allGrabbedOrders.totalPrice}
          </div>
        </div>
        <div className="date-ordered-container">
          <div className="dark-background">Date Ordered</div>
          <div className="date-ordered detail-text">
            {allGrabbedOrders.date}
          </div>
        </div>
        <div className="order-status-container">
          <div className="dark-background">Order Status</div>
          <div className="order-status detail-text">
            {allGrabbedOrders.status}
          </div>
        </div>

      </div>

      <div className='status-update-container'>
        <form onSubmit={handleSubmit}>
          <select value={status} onChange={handleChange}>
            <option value="header" defaultValue>
              Update Status
            </option>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="submit"
            value="Update"
            className="status-submit"
            style={{ textAlign: "center" }}
          />
        </form>
      </div>


      <div className="items-ordered-container">
        <div className="items-ordered-title">Items Ordered</div>
        <div className="items-ordered-list">
          {getItemContainer(allGrabbedOrders.items)}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersEdit;
