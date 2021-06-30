const express = require("express");
const {
  createOrder,
  destroyOrder,
  getAllOrders,
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

ordersRouter.post("/", requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { date_ordered, total_price } = req.body;
  try {
    const createdOrder = await createOrder({
      usersId: id,
      date_ordered,
      total_price,
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
