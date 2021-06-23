const express = require('express');
const ordersRouter = express.Router();


ordersRouter.get('/', async (req, res, next) => {

    try {
        const orders = await getAllOrders();
        res.send(orders)
    } catch (error) {
        next(error);
    }

});

ordersRouter.patch('/', async (req, res, next) => {
    
})

module.exports = ordersRouter;