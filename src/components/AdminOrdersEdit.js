import React from "react";
import "./AdminOrders.css";
// import { updateOrderStatus } from "../api/orders";
// import { TableRow, TableCell } from "@material-ui/core";

const AdminOrdersEdit = ({
  allGrabbedOrders,
  setAllOrders,
  theOrderStatus,
  settheOrderStatus,
}) => {
  // const [editOnMode, setEditOnMode] = useState(false)

  // const handleChangeStatusClick = () => {

  //     setEditOnMode(true)
  // }

  <div className='order-status-container'>
    <div className='dark-background'>Order Status</div>
    <div className='order-status detail-text'>{allGrabbedOrders.status}</div>
  </div>

  const getItemContainer = (cartItems) => {
    return (
      <>

        {cartItems.map((item) => {
          return (
            <div className='single-item-container' key={item.id}>
              <div className='item-name-container with-line'>
                <div className='single-item-header' key={item.name}>Item Name</div>
                <div className='single-item-name detail-text'>{item.name}</div>
              </div>
              <div className='item-qty-container with-line'>
                <div className='single-item-header' key={item.quantity}>Item Quantity</div>
                <div className='single-item-qty detail-text'>{item.quantity}</div>
              </div>
              <div className='item-price-container with-line'>
                <div className='single-item-header' key={item.price}>Item Price</div>
                <div className='single-item-qty detail-text'>${item.price}</div>
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

    <div id="order-history-container" >

      <div id="order-headers-container" key={allGrabbedOrders.id}>
        <div className='order-id-container'>
          <div className='dark-background'>Order ID</div>
          <div className='order-id detail-text'>{allGrabbedOrders.id}</div>
        </div>
        <div className='total-price-container'>
          <div className='dark-background'>Order Total</div>
          <div className='total-price detail-text'> ${allGrabbedOrders.totalPrice}</div>
        </div>
        <div className='date-ordered-container'>
          <div className='dark-background'>Date Ordered</div>
          <div className='date-ordered detail-text'>{allGrabbedOrders.date}</div>
        </div>
        <div className='order-status-container'>
          <div className='dark-background'>Order Status</div>
          <div className='order-status detail-text'>{allGrabbedOrders.status}</div>
        </div>
      </div>

      <div className='items-ordered-container'>
        <div className='items-ordered-title'>Items Ordered</div>
        <div className='items-ordered-list'>{getItemContainer(allGrabbedOrders.items)}</div>
      </div>


    </div>

  );
};

export default AdminOrdersEdit;
