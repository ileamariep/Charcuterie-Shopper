import React, { useState } from "react";
import "./Admin.css";
import { TextField } from "@material-ui/core";
import { updateOrderStatus } from "../api/orders";

const AdminOrdersEdit = ({ allGrabbedOrders,
    setAllOrders, theOrderStatus, settheOrderStatus }) => {

    const [editOnMode, setEditOnMode] = useState(false)

    const handleChangeStatusClick = () => {

        setEditOnMode(true)
    }

    const handleSaveStatusClick = () => {
        console.log(allGrabbedOrders.id, theOrderStatus, "the id and status")
        updateOrderStatus(allGrabbedOrders.id, theOrderStatus)
    }
    return (
        <div className="admin-order-container">
            <div className="admin-order-card">

                <span>Order Id:   {allGrabbedOrders.id}</span>
                <span>Name:   {allGrabbedOrders.name}</span>
                <span>Order Total:   {allGrabbedOrders.total_price}</span>
                <span>

                    {editOnMode ? (
                        <TextField
                            value={theOrderStatus}
                            onChange={(event) => {
                                settheOrderStatus(event.target.value);
                            }}
                        />
                    )
                        : (
                            <span>Order Status: {allGrabbedOrders.status}</span>
                        )
                    }
                    <button onClick={handleChangeStatusClick}>Change Order Status</button>
                    <button onClick={handleSaveStatusClick}>Save</button>
                </span>


                <br />

            </div>
        </div>
    );
};

export default AdminOrdersEdit;