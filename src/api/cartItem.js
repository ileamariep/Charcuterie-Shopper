import axios from "axios";

export async function addCartItem(quantity, ingredientId, usersId) {
    try {
        const response = await fetch(`api/cartItems/cartPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity,
                ingredientId,
                orderId: null,
                usersId
            })
        })

        const newCartItem = await response.json();

        console.log(newCartItem, "the new cart item from cartItems")
        return newCartItem
    } catch (error) {
        throw error;
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

export async function getUsersCartItems(userId) {
    try {
        const { data } = await axios.get(`/api/cartItems/:${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
}