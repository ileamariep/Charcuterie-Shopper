const express = require('express');
const { createCartItem, getCartByUser } = require('../db/cartItems');
const cartItemsRouter = express.Router();
const {requireUser} = require("./utils")


cartItemsRouter.get('/:usersId/', async (req, res, next) => {
    const { usersId } = req.params;
    try {
      const allCartItems = await getCartByUser({usersId});
      res.send(allCartItems)
    } catch (error) {
      next(error)
    }
  
  })

cartItemsRouter.post('/', requireUser, async (req, res, next) => {
    const { id } = req.user;
    const { ingredientsId, quantity } = req.body
    try {
      const createdCartItem = await createCartItem({ usersId: id, ingredientsId, quantity });
      res.send(createdCartItem);
    } catch (error) {
      next(error);
    }
  })

  module.exports = cartItemsRouter;