const express = require('express');
const ingredientsRouter = express.Router();


ingredientsRouter.get('/', async (req, res, next) => {

    try {

    } catch (error) {
        next(error);
    }

});


module.exports = ingredientsRouter;