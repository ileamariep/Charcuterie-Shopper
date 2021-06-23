const { client } = require("./client")

async function createIngredient({ name, description, price, quantity, category }) {

    // return the new activity
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


module.exports = {
    client,
    createIngredient,
};