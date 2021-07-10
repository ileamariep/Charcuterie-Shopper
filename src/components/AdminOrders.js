import React, { useState } from "react";
import "./AdminOrders.css";
import AdminOrdersEdit from "./AdminOrdersEdit";
import { fetchOrderByStatus } from "../api/orders";
const AdminOrders = ({ allGrabbedOrders, setAllOrders, resetOrders }) => {
  const [theOrderStatus, settheOrderStatus] = useState("");
  const handleStatusSubmit = async (event) => {
    event.preventDefault();
    try {
      if (theOrderStatus === "All" || theOrderStatus === "header") {
        resetOrders();
      } else {
        const statusResults = await fetchOrderByStatus(theOrderStatus);
        console.log(statusResults, "setting orders to status results");
        setAllOrders(statusResults);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    settheOrderStatus(event.target.value);
  };
  return (
    <div className="admin-order-container">
      <div className="order-history-title">Order History</div>
      <div className="status-selection-container">
        <form onSubmit={handleStatusSubmit}>
          <select value={theOrderStatus} onChange={handleChange}>
            <option value="header" defaultValue>
              Filter By Status
            </option>
            <option value="All" defaultValue>
              All
            </option>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className="category-submit"
            style={{ textAlign: "center" }}
          />
        </form>
      </div>
      <div className="admin-order-container">
        {allGrabbedOrders.map((allGrabbedOrders, index) => (
          <AdminOrdersEdit
            key={index}
            allGrabbedOrders={allGrabbedOrders}
            setAllOrders={setAllOrders}
            settheOrderStatus={settheOrderStatus}
            theOrderStatus={theOrderStatus}
            resetOrders={resetOrders}
          />
        ))}
      </div>
    </div>
  );
};
export default AdminOrders;
