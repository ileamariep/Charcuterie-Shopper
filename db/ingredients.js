const { client } = require("./client")
const { getOrderById } = require("./orders");

async function createIngredient({ name, description, price, quantity, category }) {

    try {
        const { rows: [ingredient] } = await client.query(`
        INSERT INTO ingredients (name, description, price, quantity, category)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
      `, [name, description, price, quantity, category])

        console.log(ingredient, 'this is the ingredient')

        return ingredient
    } catch (error) {
        throw (error)
    }
}

async function getIngredientbyId(id) {
    // return the ingredient
    try {
        const { rows: [ingredient], } = await client.query(`
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
        // await client.query(`
        //   DELETE FROM ingredients
        //   WHERE "id"=$1;
        //   `, [id]);
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

async function createOrderIngredient(orderId, ingredientId) {
    try {
        await client.query(
            `
        INSERT INTO order_ingredients("orderId", "ingredientId")
        VALUES ($1, $2)
        ON CONFLICT ("orderId", "tagId") DO NOTHING;
      `,
            [orderId, ingredientId]
        );
    } catch (error) {
        throw error;
    }
}

async function addIngredientsToOrders(orderId, ingredientList) {
    try {
        const createOrderIngredientPromises = ingredientList.map((ingredient) =>
            createOrderIngredient(orderId, ingredient.id)
        );

        await Promise.all(createOrderIngredientPromises);

        return await getOrderById(orderId);
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
    createOrderIngredient,
    addIngredientsToOrders
};