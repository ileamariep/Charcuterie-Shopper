const express = require('express');
const reviewsRouter = express.Router();


reviewsRouter.get('/', async (req, res, next) => {

    try {

    } catch (error) {
        next(error);
    }

});


module.exports = reviewsRouter;