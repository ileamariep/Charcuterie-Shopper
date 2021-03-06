const express = require("express");
const {
  createCartItem,
  getCartByUser,
  updateCartItemWithOrderId,
  getAllCartItems,
  destroyCartItems,
  updateQuantityPlusOne,
  updateQuantityMinusOne,
} = require("../db/cartItems");
const cartItemsRouter = express.Router();

cartItemsRouter.get("/:usersId", async (req, res, next) => {
  const { usersId } = req.params;
  try {
    const allCartItemsByUser = await getCartByUser(usersId);
    res.send(allCartItemsByUser);
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.get("/", async (req, res, next) => {
  try {
    const cartItems = await getAllCartItems();
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.post("/cartPost", async (req, res, next) => {
  const { quantity, ingredientId, usersId } = req.body;

  try {
    const createdCartItem = await createCartItem({
      quantity,
      ingredientId,
      usersId,
    });
    res.json(createdCartItem);
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.patch("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  const { orderId } = req.body;
  try {
    const updatedCartItem = await updateCartItemWithOrderId({
      cartId,
      orderId,
    });
    res.send(updatedCartItem);
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.patch("/:id/quantityPlus", async (req, res, next) => {
  const { id } = req.params;

  try {
    await updateQuantityPlusOne(id);
    res.send({
      message: "added a product",
    });
  } catch (error) {
    throw error;
  }
});

cartItemsRouter.patch("/:id/quantityMinus", async (req, res, next) => {
  const { id } = req.params;

  try {
    await updateQuantityMinusOne(id);
    res.send({
      message: "subtracted a product",
    });
  } catch (error) {
    throw error;
  }
});

cartItemsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCartItem = await destroyCartItems(id);
    res.send({ deletedCartItem });
  } catch (error) {
    next(error);
  }
});
module.exports = cartItemsRouter;
