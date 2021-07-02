import axios from "axios";
// import { getUserById } from "../../db";
// import { getAllUsers } from "../../db";


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
    const response = await fetch(`/api/ingredients/${ingredientId}/product`);

    const data = await response.json();
    console.log(data, "the ingredient object in API");

    return data;
  } catch (error) {
    throw error;
  }
}

// Users
export async function getUserInfo() {
  try {
    const { data } = await axios.get("/api/users/me");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  try {
    const { data } = await axios.get("/api/users");
    console.log(data.users);
    return data.users;
  } catch (error) {
    throw error;
  }
}

export async function getGuestUser(zip) {
  try {
    const { data } = await axios.post(`/api/users/guest/${zip}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSingleUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}/users`);
    const data = await response.json();
    console.log(data, "the user in API");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsersAdmin() {
  try {
    // if user.isAdmin === true
    const { data } = await axios.get("/api/users");
    if (data.isAdmin === true) {
      console.log(data.isAdmin, "this should be true");
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateUserAccount(id, updatedUser) {
  try {
    const data = await fetch(`/api/users/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        updatedUser,
      }),
      header: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function promoteUserToAdmin(id, isAdmin) {
  try {
    const data = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isAdmin,
      }),
      header: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function myAccountFetch(myToken) {
  try {
    return axios
      .get(`api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then(({ data }) => {
        return data;
      });
  } catch (err) {
    console.error(err);
  }
}

// const myOrdersFetch = () => {
// try {
//   return axios
//     .get(`${BASE}/users/${username}/routines`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${myToken}`,
//       },
//     })
//     .then(({ data }) => {
//       return data;
//     });
// } catch (err) {
//   console.error(err);
// }
// };
