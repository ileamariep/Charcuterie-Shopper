const express = require("express");
const {
  createOrder,
  destroyOrder,
  getAllOrders,
  getOrderByUser,
  getCartItemsByOrderId,
  updateStatusOfOrder,
  getOrderByStatus,
} = require("../db");

const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orderHistory = [];
    const orders = req.query.status
      ? await getOrderByStatus(req.query.status)
      : await getAllOrders();
    orders.forEach((order) => {
      const item = {
        id: order.id,
        totalPrice: order.total_price,
        date: order.date_ordered,
        status: order.status,
        items: [],
      };
      orderHistory.push(item);
    });
    await Promise.all(
      orderHistory.map(async (orderItem) => {
        return getCartItemsByOrderId(orderItem.id).then((cartItems) => {
          cartItems.forEach((cartItem) => {
            const newCartItem = {
              id: cartItem.id,
              name: cartItem.name,
              decription: cartItem.description,
              quantity: cartItem.quantity,
              price: cartItem.price,
            };
            orderItem.items.push(newCartItem);
          });
        });
      })
    );
    res.send(orderHistory);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:usersId", async (req, res, next) => {
  const { usersId } = req.params;
  try {
    const orderHistory = [];
    const orders = await getOrderByUser(usersId);
    orders.forEach((order) => {
      const item = {
        id: order.id,
        totalPrice: order.total_price,
        date: order.date_ordered,
        items: [],
      };
      orderHistory.push(item);
    });
    await Promise.all(
      orderHistory.map(async (orderItem) => {
        return getCartItemsByOrderId(orderItem.id).then((cartItems) => {
          cartItems.forEach((cartItem) => {
            const newCartItem = {
              id: cartItem.id,
              name: cartItem.name,
              decription: cartItem.description,
              quantity: cartItem.quantity,
              price: cartItem.price,
            };
            orderItem.items.push(newCartItem);
          });
        });
      })
    );
    res.send(orderHistory);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  const { total_price, status } = req.body;
  try {
    const createdOrder = await createOrder({
      total_price,
      status,
    });
    res.send(createdOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:orderId/status", async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const orderStatusUpdate = await updateStatusOfOrder(orderId, status);
    res.send(orderStatusUpdate);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await destroyOrder(orderId);
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
