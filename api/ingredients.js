const express = require('express');
const ingredientsRouter = express.Router();


ingredientsRouter.get('/', async (req, res, next) => {

    try {
        const ingredients = await getAllIngredients();
        res,send(ingredients)
    } catch (error) {
        next(error);
    }

});


module.exports = ingredientsRouter;