import axios from "axios";

export async function addCartItem(quantity, ingredientId, usersId) {
  try {
    console.log({
      quantity: quantity,
      ingredientId: ingredientId,
      usersId: usersId,
      ordersId: null,
    });
    return await axios
      .post("/api/cartItems/cartPost", {
        quantity: quantity,
        ingredientId: ingredientId,
        usersId: usersId,
        ordersId: null,
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

export async function deleteCartItem(id) {
  try {
    console.log(id)
    const  {data}  = await axios.delete(`/api/cartItems/${id}`);
    console.log(data, "THIS IS DATA")
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUsersCurrentCartItems(usersId) {
  try {
    const { data } = await axios.get(`/api/cartItems/${usersId}`);
    return data.filter((item) => item.orderId == null);
  } catch (error) {
    throw error;
  }
}

export async function addOrderIdToCartItems(id, orderId) {
  try {
    const { data } = await axios.patch(`api/cartItems/${id}`, {
      orderId,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCartItemsQuantityMinus(id) {
  try {
    const { data } = await axios.patch(`api/cartItems/${id}/quantity-`)
    return data
  } catch(error) {

  }
}

export async function updateCartItemsQuantityPlus(id) {
  try {
    const { data } = await axios.patch(`api/cartItems/${id}/quantity+`)
    return data
  } catch(error) {

  }
}

