const express = require('express');
const { destroyCartItem } = require('../db');
const { createCartItem, getCartByUser, updateCartItems } = require('../db/cartItems');
const cartItemsRouter = express.Router();
const {requireUser} = require("./utils")


cartItemsRouter.get('/:usersId', async (req, res, next) => {
    const { usersId } = req.params;
    try {
      const allCartItems = await getCartByUser({usersId});
      res.send(allCartItems)
    } catch (error) {
      next(error)
    }
  
  })

cartItemsRouter.post('/:userId', requireUser, async (req, res, next) => {
    const { id } = req.user;
    const { ingredientsId, quantity } = req.body
    try {
      const createdCartItem = await createCartItem({ usersId: id, ingredientsId, quantity });
      res.send(createdCartItem);
    } catch (error) {
      next(error);
    }
  })

cartItemsRouter.patch('/:routineId', requireUser, async (req, res, next) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
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
    } catch(error) {
        next(error)
    }
  })
  module.exports = cartItemsRouter;