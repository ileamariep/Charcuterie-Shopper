import axios from "axios";

export async function getUsersOrderHistory(userId) {
  try {
    const { data } = await axios.get(`/api/orders/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addOrder(total_price, status) {
  try {
    return await axios
      .post("/api/orders", {
        total_price,
        status,
      })
      .then(
        ({ data }) => {
          return data;
        },
        (error) => {
          console.log(error);
        }
      );
  } catch (err) {
    console.error(err);
  }
}

export async function getSingleOrder(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}/products`);

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}


export async function updateOrderStatus(id, status) {
  try {
    const { data } = await axios.patch(`api/orders/${id}/status`, {
      status
    })
    return data
  } catch (error) {
    throw error
  }
}

export async function allOrders() {
  try {
    const { data } = await axios.get("/api/orders");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function selectStatus(statusName) {
  try {
    const { data } = await axios.get(`/api/orders/${statusName}`);
    console.log(data, "this is the data in the api for status")
    return data;
  } catch (error) {
    throw error;
  }
}