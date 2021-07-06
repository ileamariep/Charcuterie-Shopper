const express = require("express");
const {
  createOrder,
  destroyOrder,
  getAllOrders,
  getOrderByUser,
  getCartItemsByOrderId,
} = require("../db");
const { requireUser } = require("./utils");
const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
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

ordersRouter.post("/", requireUser, async (req, res, next) => {
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

ordersRouter.patch("/", async (req, res, next) => { });

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
