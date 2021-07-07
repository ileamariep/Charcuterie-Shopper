import React from "react";
import "./Admin.css";
// import { updateOrderStatus } from "../api/orders";
import { TableRow, TableCell } from "@material-ui/core";


const AdminOrdersEdit = ({ allGrabbedOrders,
    setAllOrders, theOrderStatus, settheOrderStatus }) => {

    // const [editOnMode, setEditOnMode] = useState(false)

    // const handleChangeStatusClick = () => {

    //     setEditOnMode(true)
    // }

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

    // const handleSaveStatusClick = () => {
    //     console.log(allGrabbedOrders.id, theOrderStatus, "the id and status")
    //     updateOrderStatus(allGrabbedOrders.id, theOrderStatus)
    // }
    return (
        <div className="admin-order-container">


            <div id="order-history-container" align="center">
                <TableRow>


                    <div key={allGrabbedOrders.id}>
                        <TableCell align="center">
                            Order ID
                            <div>{allGrabbedOrders.id}</div>
                        </TableCell>
                        <TableCell align="center">
                            Order Total
                            <div> ${allGrabbedOrders.total_price}</div>
                        </TableCell>
                        <TableCell align="center">
                            Date Ordered
                            <div>{allGrabbedOrders.date}</div>
                        </TableCell>
                        <TableCell align="center">
                            Order Status
                            <div>{allGrabbedOrders.status}</div>
                        </TableCell>
                        <div>
                            <TableCell align="left">
                                Items Ordered:
                                <div>{getItemContainer(allGrabbedOrders.items)}</div>
                            </TableCell>
                        </div>
                    </div>


                </TableRow>
            </div>
        </div>
    );
};

export default AdminOrdersEdit;