const { client } = require("./client");

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

//   async function addCartToOrder(orderId, cartList = []) {
//     try {
//       const createLinkTagPromises = cartList.map((cart) =>
//         createCart(orderId, cart.id)
//       );
//       await Promise.all(createLinkTagPromises);
//       return await getOrderById(orderId);
//     } catch (error) {
//       throw error;
//     }
//   }




module.exports = {
    client,
    createCart,
};