import axios from "axios";

// Users
export async function getUsers() {
  try {
    const { data } = await axios.get("/api/users");
    return data.users;
  } catch (error) {
    throw error;
  }
}
export async function getGuestUser(zip) {
  try {
    const { data } = await axios.post(`/api/users/guest/${zip}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSingleUser(userId) {
  try {
    const { data } = await axios.get(`/api/users/${userId}/users`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsersAdmin() {
  try {
    const { data } = await axios.get("/api/users");
    if (data.isAdmin === true) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

// update user info - user
export async function updateUserAccount(id, updatedUser) {
  try {
    const { data } = await axios.patch(`/api/users/user/${id}`, {
      updatedUser,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id, myToken) {
  try {
    const { data } = await axios.delete(`/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// update user info admin status - admin
export async function promoteUserToAdmin(id, isAdmin, myToken) {
  try {
    const { data } = await axios.patch(`/api/users/${id}`, {
      isAdmin,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function myAccountFetch(myToken) {
  try {
    const { data } = await axios.get(`/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
