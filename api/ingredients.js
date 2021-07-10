/* eslint-disable no-sequences */

const express = require("express");
const ingredientsRouter = express.Router();
const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  destroyIngredient,
  ingredientByCategory,
  decreaseStock,
  getIngredientbyId,
} = require("../db");
// const { requireAdmin } = require("./utils");

ingredientsRouter.get("/", async (req, res, next) => {
  try {
    const ingredients = await getAllIngredients();
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
});

ingredientsRouter.get("/:ingredientId/product", async (req, res, next) => {
  const { ingredientId } = req.params;
  try {
    const ingredients = await getIngredientbyId(ingredientId);
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
});

ingredientsRouter.patch("/ingredient/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, stockQty, img, imgAlt } =
    req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }
  if (price) {
    updateFields.price = price;
  }
  if (category) {
    updateFields.category = category;
  }
  if (stockQty) {
    stockQty.city = stockQty;
  }
  if (img) {
    updateFields.img = img;
  }
  if (imgAlt) {
    updateFields.imgAlt = imgAlt;
  }

  try {
    const updatedTheIngredient = await updateIngredient(id, updateFields);
    res.send(updatedTheIngredient);
  } catch (error) {
    next(error);
  }
});

// ingredientsRouter.patch("/ingredient/:ingredientId", async (req, res, next) => {

//     try {
//         const { ingredientId } = req.params.ingredientId;
//         const { ...fields } = req.body;
//         console.log(ingredientId, "this should be my updated id")
//         const updatedIngredient = await updateIngredient(ingredientId, ...fields);

//         res.send(updatedIngredient);
//     } catch (error) {
//         next(error);
//     }
// });

ingredientsRouter.post("/", async (req, res, next) => {
  const { name, description, price, category, stockQty, img, imgAlt } =
    req.body;

  const newIngredient = {};
  try {
    // eslint-disable-next-line no-unused-expressions
    (newIngredient.name = name),
      (newIngredient.description = description),
      (newIngredient.price = price),
      (newIngredient.category = category),
      (newIngredient.stockQty = stockQty),
      (newIngredient.img = img),
      (newIngredient.imgAlt = imgAlt);

    const theNewIngredient = await createIngredient(newIngredient);

    res.send(theNewIngredient);
  } catch (error) {
    next(error);
  }
});

ingredientsRouter.delete("/:id", async (req, res, next) => {
  // DELETE /routines/:routineId (**)
  // Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.
  const ingredientId = req.params.id;
  try {
    const deleteIngredient = await destroyIngredient(ingredientId);
    res.send(deleteIngredient);
  } catch (error) {
    next(error);
  }
});

ingredientsRouter.get("/:category", async (req, res, next) => {
  // read the category from the params
  const { category } = req.params;

  try {
    const ingredientsByCategory = await ingredientByCategory(category);

    res.send(ingredientsByCategory);
  } catch (error) {
    next(error);
  }
});

///this fires on add to card click handler
ingredientsRouter.patch("/:ingredientId/:qty", async (req, res, next) => {
  const { ingredientId, qty } = req.params;

  try {
    const purchased = await decreaseStock(ingredientId, qty);
    res.send(purchased);
  } catch (error) {
    next(error);
  }
});

module.exports = ingredientsRouter;
