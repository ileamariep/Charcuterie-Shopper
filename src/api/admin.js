import axios from "axios";

export async function deleteIngredient() {
    try {
        const { data } = await axios.get("/api/ingredients");
        return data;
    } catch (error) {
        throw error;
    }
}