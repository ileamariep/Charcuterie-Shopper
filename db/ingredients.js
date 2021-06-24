const { client } = require("./client")

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

module.exports = {
    client,
    createIngredient,
    getIngredientbyId,
    getAllIngredients
};