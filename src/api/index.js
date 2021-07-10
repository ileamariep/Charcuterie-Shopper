import axios from "axios";

export async function updateCount(id, qty) {
  try {
    const { data } = await axios.patch(`/api/ingredients/${id}/${qty}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSingleIngredient(ingredientId) {
  try {
    const response = await fetch(`/api/ingredients/${ingredientId}/product`);

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
