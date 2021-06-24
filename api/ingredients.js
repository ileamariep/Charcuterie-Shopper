const express = require('express');
const ingredientsRouter = express.Router();
const { getAllIngredients, createIngredient, getIngredientbyId } = require('../db');

ingredientsRouter.get('/', async (req, res, next) => {

    try {
        const ingredients = await getAllIngredients();
        res.send(ingredients)
    } catch (error) {
        next(error);
    }

});


module.exports = ingredientsRouter;