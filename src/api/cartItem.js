import axios from "axios";

// export async function addCartItem(quantity, ingredientId, usersId) {
//     try {
//         const response = await fetch(`api/cartItems/cartPost`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 quantity,
//                 ingredientId,
//                 orderId: null,
//                 usersId
//             })
//         })

//         const newCartItem = await response.json();

//         console.log(newCartItem, "the new cart item from cartItems")
//         return newCartItem
//     } catch (error) {
//         throw error;
//     }
// }

export async function addCartItem(quantity ,ingredientId, usersId) {
    try {
        console.log({
            quantity: quantity,
            ingredientId: ingredientId,
            usersId: usersId,
            ordersId: null})
        return await axios
          .post("/api/cartItems/cartPost", {
            quantity: quantity,
            ingredientId: ingredientId,
            usersId: usersId,
            ordersId: null
          })
          .then(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      } catch (err) {
        console.error(err);
      }
}
// export async function addCartItem(quantity, ingredientId, usersId) {
//     return await axios.post(`api/cartItems/cartPost`, {
//         quantity, ingredientId, usersId
//     })
//         .then(response => response.status)
//         .catch(err => console.warn(err))
// }
export async function deleteCartItem(id) {
    try {
        const { data } = await axios.delete(`/api/cartItems/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getUsersCurrentCartItems(usersId) {
    try { 
        const { data } = await axios.get(`/api/cartItems/${usersId}`);
        console.log(data, "THIS IS WHAT THE BACKEND IS RETURNING FRO CART ITEMS BY USERS")
        return data;
    } catch (error) {
        throw error;
    }
}