const express = require('express');
const { createCartItem, getCartByUser, updateCartItemWithOrderId, getAllCartItems, destroyCartItems } = require('../db/cartItems');
const cartItemsRouter = express.Router();
const { requireUser } = require("./utils")


cartItemsRouter.get('/:usersId', async (req, res, next) => {
  const { usersId } = req.params;

  try {
    const allCartItemsByUser = await getCartByUser(usersId);
    res.send(allCartItemsByUser)
  } catch (error) {
    next(error)
  }

})

cartItemsRouter.get('/', async (req, res, next) => {
  try {
    const cartItems = await getAllCartItems()
    res.send(cartItems)
  } catch (error) {
    next(error)
  }
})

cartItemsRouter.post('/cartPost', async (req, res, next) => {
  const { quantity, ingredientId, usersId, } = req.body;


  try {
    const createdCartItem = await createCartItem({ quantity, ingredientId, usersId });
    res.json(createdCartItem);
  } catch (error) {
    next(error);
  }
})

cartItemsRouter.patch('/:cartId', async (req, res, next) => {
  const { cartId } = req.params
  const { orderId } = req.body
  try {
    const updatedCartItem = await updateCartItemWithOrderId({ cartId, orderId });
    res.send(updatedCartItem)
  } catch (error) {
    next(error)
  }
})

cartItemsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    console.log("Hello i am in the cart Irtems deete route")
    const deletedCartItem = await destroyCartItems(id)
    console.log(deletedCartItem, 'this is the deleted cart Item')
    res.send(deletedCartItem)
  } catch (error) {
    next(error)
  }
})
module.exports = cartItemsRouter;