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
    const { data } = await axios.post("/api/orders", {
      total_price,
      status,
    });
    return data;
  } catch (err) {
    throw err;
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
    const { data } = await axios.patch(`/api/orders/${id}/status`, {
      status: status,
    });

    return data;
  } catch (error) {
    throw error;
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

export async function fetchOrderByStatus(status) {
  try {
    const { data } = await axios.get(`/api/orders`, { params: { status } });

    return data;
  } catch (error) {
    throw error;
  }
}
