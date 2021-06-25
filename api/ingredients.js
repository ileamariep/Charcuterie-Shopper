/* eslint-disable no-sequences */
const express = require('express');
const ingredientsRouter = express.Router();
const { getAllIngredients, createIngredient, updateIngredient, destroyIngredient, ingredientByCategory } = require('../db');
// const { requireAdmin } = require("./utils");

ingredientsRouter.get('/', async (req, res, next) => {

    try {
        const ingredients = await getAllIngredients();
        res.send(ingredients)
    } catch (error) {
        next(error);
    }

});

ingredientsRouter.patch('/:id', async (req, res, next) => {

    const id = req.params.id
    const { name, description } = req.body


    try {

        const newIngredient = await updateIngredient({ id, name, description })
        res.send(newIngredient)

    } catch (error) {
        next(error);
    }

});

ingredientsRouter.post('/', async (req, res, next) => {

    const { name, description, price, quantity, category } = req.body
    const newIngredient = {}
    try {

        // eslint-disable-next-line no-unused-expressions
        (newIngredient.name = name),
            (newIngredient.description = description),
            (newIngredient.price = price),
            (newIngredient.quantity = quantity),
            (newIngredient.category = category)



        const theNewIngredient = await createIngredient(newIngredient)

        res.send(theNewIngredient)

    } catch (error) {
        next(error);
    }

});

ingredientsRouter.delete('/:id', async (req, res, next) => {
    // DELETE /routines/:routineId (**)
    // Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.
    const ingredientId = req.params.id
    try {
        const deleteIngredient = await destroyIngredient(ingredientId)
        res.send(deleteIngredient)
    } catch (error) {
        next(error);
    }

});

ingredientsRouter.get("/:categoryName", async (req, res, next) => {
    // read the category from the params
    const { categoryName } = req.params;

    try {
        const ingredientsByCategory = await ingredientByCategory(categoryName);

        res.send(ingredientsByCategory);
    } catch (error) {
        next(error);
    }
});


module.exports = ingredientsRouter;