const { client } = require("./client");

async function createOrder({ total_price, status }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders(total_price, status)
        VALUES($1, $2)
        RETURNING *;
      `,
      [total_price, status]
    );
    console.log(order, "!!!!!!!!!!!!!!!!!!!!!!!");
    return order;
  } catch (error) {
    throw error;
  }
}
async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
    SELECT DISTINCT
    cart_items."usersId",
    orders.id,
    orders.total_price,
    orders.date_ordered,
    orders.status
   FROM cart_items
   JOIN orders
   ON cart_items."orderId"=orders.id
         
      `);
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByOrderId(orderId) {
  try {
    const { rows: orders } = await client.query(`
    SELECT DISTINCT
    cart_items."orderId",
    orders.id,
    orders.total_price,
    orders.date_ordered
   FROM cart_items
   JOIN orders
   ON cart_items."orderId"=orders.id
   WHERE cart_items."orderId"=$1
         
      `);
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE id=$1;
      `,
      [orderId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

// async function getCartByUser(usersId) {
//   try {
//     const { rows: cartItems } = await client.query(
//       `
//       SELECT *
//         FROM ingredients
//         JOIN cart_items
//         ON ingredients.id=cart_items."ingredientId"
//         WHERE "usersId"=$1
//         `,
//       [usersId]
//     );
//     return cartItems
//   } catch (error) {
//     throw error;
//   }
// }

async function getOrderByUser(usersId) {
  try {
    const { rows: order } = await client.query(
      `
      SELECT DISTINCT
          cart_items."usersId",
          orders.id,
          orders.total_price,
          orders.date_ordered
         FROM cart_items
         JOIN orders
         ON cart_items."orderId"=orders.id
         WHERE cart_items."usersId"=$1
    `,
      [usersId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

// SELECT
//         ingredients.name,
//         ingredients.description,
//         ingredients.price,
//         ingredients.img,
//         cart_items.id,
//         cart_items.quantity,
//         orders.total_price,
//         orders.date_ordered
//         FROM ingredients
//         JOIN cart_items
//         ON ingredients.id=cart_items."ingredientId"
//         JOIN orders
//         ON orders.id=cart_items."orderId"
//         WHERE cart_items."userId"=$1;

const updateOrderStatus = async (id, status) => {
  try {
    const { rows: orders } = await client.query(
      `
      UPDATE orders
      SET status=$1
      WHERE id=$2
      RETURNING *;
      `,
      [id, status]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

const destroyOrder = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      DELETE FROM cart_items
      WHERE "orderId" = $1
      `,
      [id]
    );
    await client.query(
      `
      DELETE FROM orders
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};
// async function demo() {
//   try {
//     const { test } = await client.query(
//       `
//       SELECT ingredients.name, ingredients.description, ingredients.price, ingredients.img, cart_items.quantity, orders.id, orders.total_price, orders.date_ordered
//       FROM ingredients
//       JOIN cart_items
//       ON ingredients.id=cart_items."ingredientsId"
//       JOIN orders
//       ON cart_items."orderId"=orders.id
//       `
//     );
//     return test;
//   } catch (err) {
//     throw err;
//   }
// }
module.exports = {
  client,
  createOrder,
  getAllOrders,
  updateOrderStatus,
  destroyOrder,
  getOrderByUser,
  getOrderById,
  getAllOrdersByOrderId
};
