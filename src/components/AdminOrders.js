import React, { useState } from "react";
import "./Admin.css";
import AdminOrdersEdit from "./AdminOrdersEdit";
// import { getSomething } from "../api";

const AdminOrders = ({ allGrabbedOrders,
    setAllOrders }) => {
    const [theOrderStatus, settheOrderStatus] = useState(allGrabbedOrders.status)

    return (


        <div className="admin-order-container">
            <h1>All Orders</h1>
            <form >

                <select value={theOrderStatus} >
                    <option value="header" defaultValue>Filter By Status</option>
                    <option value="created">Created</option>
                    <option value="processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>

                <input type="submit" value="Submit" className='category-submit' style={{ textAlign: "center" }} />
            </form>
            {allGrabbedOrders.map(
                (allGrabbedOrders) => (
                    <AdminOrdersEdit
                        key={allGrabbedOrders.id}
                        allGrabbedOrders={allGrabbedOrders}
                        setAllOrders={setAllOrders}
                        settheOrderStatus={settheOrderStatus}
                        theOrderStatus={theOrderStatus}

                    />
                )
            )}

        </div>
    );
};

export default AdminOrders;