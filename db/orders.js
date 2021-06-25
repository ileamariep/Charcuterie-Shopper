const { client } = require("./client");

// async function createOrder({ date_ordered, total_price }) {
//     // create and return the new routine
//     try {
//         const { rows: [order] } = await client.query(`
//         INSERT INTO orders(date_ordered, total_price)
//         VALUES($1, $2)
//         RETURNING *;
//       `, [date_ordered, total_price])

//         return order
//     } catch (error) {
//         throw (error)
//     }

// }


async function createOrder({
  date_ordered,
  total_price,
}) {
  try {
    const { rows: [ order ] } = await client.query(`
      INSERT INTO orders(date_ordered, total_price) 
      VALUES($1, $2)
      RETURNING *;
    `, [date_ordered, total_price]);
    console.log(order.userId, 'order data')
    return order
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
    try {
        const { rows: orderId } = await client.query(`
        SELECT id
        FROM orders;
      `);

        const orders = await Promise.all(orderId.map(
            order => getOrderById(order.id)
        ));
          console.log(orders, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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
        WHERE "usersId"=${userId};
      `);

        const orders = await Promise.all(orderId.map(
            order => getOrderById(order.id)
        ));

        return orders;
    } catch (error) {
        throw error;
    }
}

// async function getAllRoutinesByUser({ username }) {
//   try {
//       const {rows: routines} = await client.query(`
//       SELECT *, users.username AS "creatorName"
//       FROM routines
//       JOIN users ON routines."creatorId"=users.id
//       WHERE username=$1
//       `,[username])

//       const {rows:activities} = await client.query(`
//       SELECT *
//       FROM activities
//       JOIN routine_activities ON activities.id = routine_activities."activityId"
//     `)

//     routines.forEach((e) => {
//         e.activities = activities.filter(a => e.id === a.routineId)
//     });

//     return routines
//   } catch(error) {
//       throw error
//   }
// }



async function getOrderById(orderId) {
    try {
        const { rows: [order] } = await client.query(`
        SELECT *
        FROM orders
        WHERE id=$1;
      `, [orderId]);

        const { rows: ingredients } = await client.query(`
      SELECT *
      FROM ingredients
      JOIN cart ON ingredients.id=cart."ingredientId"
      WHERE cart."orderId"=$1;
    `, [orderId])

        const { rows: user } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1;
    `, [orderId])


        order.ingredients = ingredients;
        order.user = user;
      console.log(user, "these are users")
        return order;
    } catch (error) {
        throw error;
    }
}

async function createCart(orderId, ingredientId) {
  try {
    await client.query(`
      INSERT INTO cart("orderId", "ingredientId")
      VALUES ($1, $2)
      RETURNING *
    `, [orderId, ingredientId]);
  } catch (error) {
    throw error;
  }
}


// async function addIngredientsToOrder(orderId, ingredientList) {
//   try {
//     console.log(ingredientList, "*****************")
//     const createOrderIngredientPromises = ingredientList.map(
//       ingredient => createOrderIngredient(orderId, ingredient.Id)
//     );

//     await Promise.all(createOrderIngredientPromises);

//     return await getOrderById(orderId);
//   } catch (error) {
//     throw error;
//   }
// }

async function addCartIngredientsToOrder({ orderId, ingredientId }) {
  try {
    const { rows : [cart] } = await client.query(`
      INSERT INTO cart("orderId", "ingredientId") 
      VALUES($1, $2) 
      RETURNING *;
    `, [orderId, ingredientId]);

    return cart;
  } catch (error) {
    throw error;
  }
}

const destroyOrder = async (id) => {
  try {
      const { rows: [order] } = await client.query(`
      DELETE FROM orders
      WHERE id = $1
      RETURNING *;
      `, [id])

      await client.query(`
      DELETE FROM cart
      WHERE "orderId" = $1
      `, [id])

      return order
  } catch (error) {
      throw error;
  }
}

module.exports = {
    client,
    createOrder,
    getAllOrders,
    getOrderByUser,
    getOrderById,
    destroyOrder,
    addCartIngredientsToOrder,
    createCart

};