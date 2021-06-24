const { client } = require("./client")

async function createOrder({ date_ordered, total_price }) {
    // create and return the new routine
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders(date_ordered, total_price)
        VALUES($1, $2)
        RETURNING *;
      `, [date_ordered, total_price])

        return order
    } catch (error) {
        throw (error)
    }

}

// async function createOrder(orderList) {
//     if (orderList.length === 0) {
//       return;
//     }
//     const insertValues = orderList.map((_, index) => `$${index + 1}`).join("), (");
//     const selectValues = orderList.map((_, index) => `$${index + 1}`).join(", ");
//     try {
//       await client.query(
//         `INSERT INTO orders(id)
//         VALUES (${insertValues})
//         ON CONFLICT (id) DO NOTHING;`,
//         orderList
//       );
//       const { rows } = await client.query(
//         `SELECT * FROM orders
//         WHERE id
//         IN (${selectValues});`,
//         orderList
//       );
//       return rows;
//     } catch (error) {
//       throw error;
//     }
//   }

async function getAllOrders() {
    try {
      const { rows: orderId } = await client.query(`
        SELECT id
        FROM orders;
      `);
  
      const orders = await Promise.all(orderId.map(
        order => getOrderById( order.id )
      ));
  
      return orders;
    } catch (error) {
      throw error;
    }
  }


async function getOrderByUser(userId) {
    try {
      const { rows: orderId } = await client.query(`
        SELECT id 
        FROM orders 
        WHERE "usersId"=${ userId };
      `);
  
      const orders = await Promise.all(orderId.map(
        order => getOrderById( order.id )
      ));
  
      return orders;
    } catch (error) {
      throw error;
    }
  }

async function getOrderById(orderId) {
    try {
      const { rows: [ order ]  } = await client.query(`
        SELECT *
        FROM orders
        WHERE id=$1;
      `, [orderId]);
  
      const { rows: ingredients } = await client.query(`
      SELECT ingredients.*
      FROM ingredients
      JOIN order_ingredients ON ingredients.id=order_ingredients."ingredientId"
      WHERE order_ingredients."orderId"=$1;
    `, [orderId])

    const { rows: [user] } = await client.query(`
      SELECT id, username, name, location
      FROM users
      WHERE id=$1;
    `, [order.usersId])

  
      order.ingredients = ingredients;
      order.user = user;
  
      delete user.usersId;
  
      return order;
    } catch (error) {
      throw error;
    }
  }

// async function addIngredientToOrder({ routineId, activityId, count, duration }) {
//     try {
//       const { rows : [routine_activities] } = await client.query(`
//         INSERT INTO routine_activities("routineId", "activityId", count, duration) 
//         VALUES($1, $2, $3, $4) 
//         RETURNING *;
//       `, [routineId, activityId, count, duration]);
  
//       return routine_activities;
//     } catch (error) {
//       throw error;
//     }
// }

module.exports = {
    client,
    createOrder,
};