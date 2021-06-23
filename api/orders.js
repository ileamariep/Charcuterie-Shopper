const express = require('express');
const ordersRouter = express.Router();


ordersRouter.get('/', async (req, res, next) => {

    try {

    } catch (error) {
        next(error);
    }

});


module.exports = ordersRouter;