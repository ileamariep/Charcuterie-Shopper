import axios from "axios";
import { ADMIN_PRODUCTS_ROUTE } from "../constants";
export async function allIngredients() {
  try {
    const { data } = await axios.get("/api/ingredients");
    return data;
  } catch (error) {
    throw error;
  }
}

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

export async function deleteIngredient(id) {
  try {
    const data = await axios.delete(`/api/ingredients/${id}`, {
      header: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addAnIngredient(
  name,
  description,
  price,
  category,
  stockQty,
  img,
  imgAlt
) {
  try {
    const { data } = await axios.post("/api/ingredients", {
      name,
      description,
      price,
      category,
      stockQty,
      img,
      imgAlt,
    });

    window.location.href = `${ADMIN_PRODUCTS_ROUTE}`;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function selectCategory(categoryName) {
  try {
    const response = await fetch(`/api/ingredients/${categoryName}`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
