<<<<<<< Updated upstream
const express = require("express");
const {
  createOrder,
  destroyOrder,
  getAllOrders,
  addIngredientsToOrder,
} = require("../db");
const { requireUser } = require("./utils");
const ordersRouter = express.Router();
=======
const express = require('express');
const { createOrder, destroyOrder, getAllOrders, addIngredientsToOrder } = require('../db');
const { requireUser } = require('./utils');
const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res, next) => {

  try {
    const orders = await getAllOrders();
    res.send(orders)
  } catch (error) {
    next(error);
  }
>>>>>>> Stashed changes

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

<<<<<<< Updated upstream
ordersRouter.post("/", requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { date_ordered, total_price } = req.body;
  try {
    const createdOrder = await createOrder({
      usersId: id,
      date_ordered,
      total_price,
    });
=======
ordersRouter.post('/', requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { date_ordered, total_price } = req.body
  try {
    const createdOrder = await createOrder({ usersId: id, date_ordered, total_price });
>>>>>>> Stashed changes
    res.send(createdOrder);
  } catch (error) {
    next(error);
  }
<<<<<<< Updated upstream
=======
})

ordersRouter.post('/:orderId/ingredients', async (req, res, next) => {
  const { orderId } = req.params
  const { ingredientId } = req.body;
  try {
    const orders = await addIngredientsToOrder({ orderId, ingredientId });
    res.send(orders);
  } catch ({ name, message }) {
    next({ name, message });
  }

>>>>>>> Stashed changes
});

ordersRouter.post("/:orderId/ingredients", async (req, res, next) => {
  const { orderId } = req.params;
  const { ingredientId } = req.body;
  try {
    const orders = await addIngredientsToOrder({ orderId, ingredientId });
    res.send(orders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.patch("/", async (req, res, next) => {});

<<<<<<< Updated upstream
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
=======
ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await destroyOrder(orderId)
    res.send(deletedOrder)
  } catch (error) {
    next(error)
  }
})
module.exports = ordersRouter;
>>>>>>> Stashed changes
