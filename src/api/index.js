import axios from "axios";
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
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getSingleIngredient(ingredientId) {
    try {
        const response = await fetch(`/api/ingredients/${ingredientId}/product`)

        const data = await response.json();
        console.log(data, 'the ingredient object in API')
        return data

    } catch (error) {
        throw error;
    }
}



// export async function createNewUser(
//   username,
//   email,
//   password,
//   address,
//   city,
//   state,
//   zip
// ) {
//   try {
//     const { data } = await axios.patch(
//       `/api/users/register`,
//       username,
//       email,
//       password,
//       address,
//       city,
//       state,
//       zip
//     );
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
