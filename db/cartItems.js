const { client } = require("./client");


async function createCartItem({quantity, ingredientId, usersId }) {
  try {
    console.log(quantity, ingredientId, usersId , "%%%%%%%%%%%%%%%%%%%")
    const { rows: [cart_item] } = await client.query(
      `
        INSERT INTO cart_items ("quantity", "ingredientId", "usersId")
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [quantity, ingredientId, usersId]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function getAllCartItems() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM cart_items
      `
    )
    return rows
  } catch(error) {
    throw error
  }
}

async function getCartItemsById({ id }) {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
          SELECT * 
          FROM cart_items
          WHERE id=$1;
     `,
      [id]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser({ id }) {
  try {
    const { rows } = await client.query(
      `
        SELECT ingredients.name, ingredients.description, ingredients.price, ingredients.img, cart_items.id ,cart_items.quantity
        FROM ingredients
        JOIN cart_items
        ON ingredients.id=cart_items."ingredientId"
        WHERE "usersId"=$1
        `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateCartItems({ id, quantity }) {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
          UPDATE cart_items
          SET quantity=$2
          WHERE id=$1
          RETURNING *;
          `,
      [id, quantity]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
}

async function destroyCartItems(id) {
  try {
    const { rows: cartItems } = await client.query(
      `
  DELETE * 
  FROM cart_items
  WHERE id=$1
  `,
      [id]
    );

    return cartItems;
  } catch (err) {
    throw err;
  }
}


module.exports = {
  client,
  getAllCartItems,
  createCartItem,
  getCartItemsById,
  getCartByUser,
  updateCartItems,
  destroyCartItems,
};
