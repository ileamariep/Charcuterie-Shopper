const { client } = require("./client")

async function createIngredient({ name, description, price, category, stockQty, img, imgAlt }) {

    try {
        const { rows: [ingredient] } = await client.query(`
        INSERT INTO ingredients (name, description, price, category, "stockQty", img, "imgAlt")
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `, [name, description, price, category, stockQty, img, imgAlt])

        return ingredient
    } catch (error) {
        throw (error)
    }
}

async function getIngredientbyId(id) {
    // return the ingredient
    try {
        const { rows: [ingredient] } = await client.query(`
            SELECT *
            FROM ingredients
            WHERE id=${id};
          `);

        return ingredient
    } catch (error) {
        throw (error)
    }
}

async function getAllIngredients() {
    // select and return an array of all activities
    try {
        const { rows: id } = await client.query(`
        SELECT id 
        FROM ingredients;
      `)

        const ingredients = await Promise.all(
            id.map((ingredient) => getIngredientbyId(ingredient.id))
        )
        return ingredients
    } catch (error) {
        throw (error)
    }
}
async function updateIngredient(ingredientId, fields = {}) {


    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    try {
        if (setString.length > 0) {
            await client.query(
                `
          UPDATE ingredients
          SET ${setString}
          WHERE id=${ingredientId}
          RETURNING *;
        `,
                Object.values(fields)
            );
        }

        return await getIngredientbyId(ingredientId);
    } catch (error) {
        throw error;
    }
}

async function destroyIngredient(id) {
    try {
        const ingredientId = getIngredientbyId(id);
        if (!ingredientId) {
            throw new Error({ message: "Error this ingredient doesnt exist" })
        };

        const { rows: [ingredient] } = await client.query(`
          DELETE FROM ingredients
          WHERE id=$1
          RETURNING *;
          `, [id])
        return ingredient
    } catch (error) {
        throw error
    }
}

async function ingredientByCategory(category) {
    try {
        const { rows: ingredients } = await client.query(
            `
        SELECT id
        FROM ingredients
        WHERE ingredients.category=$1;
      `,
            [category]
        );

        return await Promise.all(ingredients.map((ingredient) => getIngredientbyId(ingredient.id)));
    } catch (error) {
        throw error;
    }
}

async function decreaseStock(id, qty) {
    try {
        const {
            rows: [ingredient],
        } = await client.query(
            `
             UPDATE ingredients 
             SET "stockQty" = "stockQty" - $2
             WHERE id = $1
             RETURNING *;
          `,
            [id, qty]
        );
        console.log("ingredient Information", ingredient);

        return ingredient;
    } catch (error) {
        throw error;
    }
}

async function increaseStock(id, qty) {
    try {
        const {
            rows: [ingredient],
        } = await client.query(
            `
             UPDATE ingredients 
             SET "stock_qty" = "stock_qty" + ${qty}
             WHERE id = $1
             RETURNING *;
          `,
            [id]
        );
        console.log("ingredient Information", ingredient);

        return ingredient;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    client,
    createIngredient,
    getIngredientbyId,
    getAllIngredients,
    updateIngredient,
    destroyIngredient,
    ingredientByCategory,
    decreaseStock,
    increaseStock
};