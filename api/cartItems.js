const express = require('express');
const { destroyCartItem } = require('../db');
const { createCartItem, getCartByUser, updateCartItems, getAllCartItems } = require('../db/cartItems');
const cartItemsRouter = express.Router();
const { requireUser } = require("./utils")


cartItemsRouter.get('/:usersId', async (req, res, next) => {
  const { usersId } = req.params;
  const {orderId} = req.body
  try {
    if(orderId === null) {
      const allCartItemsByUser = await getCartByUser({ usersId });
    res.send(allCartItemsByUser)
    } else {
      res.send()
    }
    
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
    const createdCartItem = await createCartItem({quantity, ingredientId, usersId});
    res.json(createdCartItem);
  } catch (error) {
    next(error);
  }
})

cartItemsRouter.patch('/:routineId', requireUser, async (req, res, next) => {
  // const { cartItemId } = req.params;
  // const { quantity } = req.body;
  try {
    const updatedRoutine = await updateCartItems();
    res.send(updatedRoutine)
  } catch (error) {
    next(error)
  }
})

cartItemsRouter.delete('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedCartItem = await destroyCartItem(id)
    res.send(deletedCartItem)
  } catch (error) {
    next(error)
  }
})
module.exports = cartItemsRouter;