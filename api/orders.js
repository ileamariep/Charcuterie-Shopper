const express = require("express");
const {
  createOrder,
  destroyOrder,
  getAllOrders,
  getOrderById,
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

ordersRouter.get('/:orderId', async (req, res, next) => {
  const { orderId } = req.params
  try {
      const order = await getOrderById(orderId);
      res.send(order)
  } catch (error) {
      next(error);
  }
});

ordersRouter.post("/", requireUser, async (req, res, next) => {
  const {total_price, status} = req.body;
  try {
    const createdOrder = await createOrder({
      total_price,
      status
    });
    res.send(createdOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/", async (req, res, next) => {

});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await destroyOrder(orderId);
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});
module.exports = ordersRouter;
