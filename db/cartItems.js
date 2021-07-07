const { client } = require("./client");

async function createCartItem({ quantity, ingredientId, usersId }) {
  try {
    console.log(quantity, ingredientId, usersId, "%%%%%%%%%%%%%%%%%%%");
    const {
      rows: [cart_item],
    } = await client.query(
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
        FROM ingredients
        JOIN cart_items
        ON ingredients.id=cart_items."ingredientId"
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCartItemsByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
        SELECT 
          ingredients.name,
          ingredients.price,
          ingredients.description,
          ingredients.img,
          cart_items.quantity,
          cart_items.id
         FROM ingredients
         JOIN cart_items
         ON ingredients.id=cart_items."ingredientId"
          WHERE cart_items."orderId"=$1;
     `,
      [orderId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(usersId) {
  try {
    const { rows: cartItems } = await client.query(
      `
      SELECT *
        FROM ingredients
        JOIN cart_items
        ON ingredients.id=cart_items."ingredientId"
        WHERE "usersId"=$1
        `,
      [usersId]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
}

async function updateCartItemWithQuantity({ id, quantity }) {
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

async function updateCartItemWithOrderId({ cartId, orderId }) {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
          UPDATE cart_items
          SET "orderId"=$1
          WHERE id=$2
          RETURNING *;
          `,
      [orderId, cartId]
    );
    console.log(cartItems);
    return cartItems;
  } catch (error) {
    throw error;
  }
}

async function destroyCartItems(id) {
  try {
    const { rows: [cartItem] } = await client.query(
      `
  DELETE 
  FROM cart_items
  WHERE id=$1
  RETURNING *;
  `,
      [id]
    );
      console.log(cartItem, 'this is the deleted cart Item')
    return cartItem;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  client,
  getAllCartItems,
  createCartItem,
  getCartByUser,
  getCartItemsByOrderId,
  updateCartItemWithQuantity,
  updateCartItemWithOrderId,
  destroyCartItems,
};
