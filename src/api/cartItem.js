import axios from "axios";

export async function addCartItem(userId) {
    try {
        const { data } = await axios.post(`/api/cartItems/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
}

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