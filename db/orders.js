const { client } = require("./client");
// const { createCart, addCartToOrder } = require("./cart")


async function createOrder({ date_ordered, total_price }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders(date_ordered, total_price)
        VALUES($1, $2)
        RETURNING *;
      `,
      [date_ordered, total_price]
    );
    return order;
  } catch (error) {
    throw error;
  }
}
async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
    SELECT 
      ingredients.name, 
      ingredients.description, 
      ingredients.price, 
      ingredients.img, 
      cart_items.id,
      cart_items.quantity, 
      orders.total_price,
      orders.date_ordered
      FROM ingredients
      JOIN cart_items
      ON ingredients.id=cart_items."ingredientId"
      JOIN orders
      ON orders.id=cart_items."orderId"
      WHERE cart_items."orderId"=$1;
      `);
   
    console.log(orders, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    return orders;
  } catch (error) {
    throw error;
  }
}
// async function getOrderByUser(id) {
//   try {
//     const { rows: orderId } = await client.query(
//       `
//     select * 
//     from cart_items
//     JOIN orders 
//     ON cart_items."orderId" = orders.id;
//     `,
//       [id]
//     );
//     const orders = await Promise.all(
//       orderId.map((order) => getOrderById(order.id))
//     );
//     return orders;
//   } catch (error) {
//     throw error;
//   }
// }
// double join ingridients to cart items to orders
async function getOrderByUser(orderId) {
  try {

    const { rows: order } = await client.query(
      `
      SELECT 
        ingredients.name, 
        ingredients.description, 
        ingredients.price, 
        ingredients.img, 
        cart_items.id,
        cart_items.quantity, 
        orders.total_price,
        orders.date_ordered
      FROM ingredients
      JOIN cart_items
      ON ingredients.id=cart_items."ingredientId"
      JOIN orders
      ON orders.id=cart_items."orderId"
      WHERE cart_items."orderId"=$1;
    `,
      [orderId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

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
  destroyOrder,
  getOrderByUser
};



