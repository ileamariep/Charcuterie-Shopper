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
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
    SELECT 
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

async function getOrderByStatus(status) {
  try {
    const { rows: order } = await client.query(
      `
      SELECT DISTINCT
          cart_items."usersId",
          orders.id,
          orders.total_price,
          orders.date_ordered,
          orders.status
         FROM cart_items
         JOIN orders
         ON cart_items."orderId"=orders.id
         WHERE status LIKE $1
    `,
      [`%${status}%`]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

const updateStatusOfOrder = async (orderId, status) => {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
      UPDATE orders
      SET status=$2
      WHERE id=$1
      RETURNING *;
      `,
      [orderId, status]
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

module.exports = {
  client,
  createOrder,
  getAllOrders,
  updateStatusOfOrder,
  destroyOrder,
  getOrderByUser,
  getOrderById,
  getAllOrdersByOrderId,
  getOrderByStatus,
};
