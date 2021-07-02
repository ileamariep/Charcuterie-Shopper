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
        FROM ingredients
        JOIN cart_items
        ON ingredients.id=cart_items."ingredientId"
      `
    )
    return rows
  } catch(error) {
    throw error
  }
}

// async function getCartItemsById(id) {
//   try {
//     const {
//       rows: [cartItems],
//     } = await client.query(
//       `
//           SELECT * 
//           FROM cart_items
//           WHERE id=$1;
//      `,
//       [id]
//     );
//     return cartItems;
//   } catch (error) {
//     throw error;
//   }
// }



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
    return cartItems
  } catch (error) {
    throw error;
  }
}

async function updateCartItems({ id, quantity, ordersId }) {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
          UPDATE cart_items
          SET quantity=$2, "ordersId" =$3
          WHERE id=$1
          RETURNING *;
          `,
      [id, quantity, ordersId]
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
  getCartByUser,
  updateCartItems,
  destroyCartItems,
};
