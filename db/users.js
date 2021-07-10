const { client } = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({
  email,
  username,
  password,
  address,
  city,
  state,
  zip,
  isAdmin = false,
  isUser = true,
}) {
  //  make sure to hash the password before storing it to the database
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    password = hashedPassword;
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (email, username, password, address, city, state, zip, "isAdmin", "isUser")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
        `,
      [email, username, password, address, city, state, zip, isAdmin, isUser]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM users;
      `);

    return rows;
  } catch (error) {
    console.error("could not get all users", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username, email, address, city, state, zip, "isAdmin", "isUser"
      FROM users
      WHERE id=${userId}
        `
    );
    // delete user.password;
    return user;
  } catch (error) {
    console.error("could not get user by id", error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE email=$1
      `,
      [email]
    );

    return user;
  } catch (error) {
    console.error("could not get user email", error);
    throw error;
  }
}

async function updateUser(userId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString.length > 0) {
      if ("password" in fields) {
        fields.password = await bcrypt.hash(fields.password, SALT_COUNT);
      }

      await client.query(
        `
        UPDATE users
        SET ${setString}
        WHERE id=${userId}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getUserById(userId);
  } catch (error) {
    console.error("could not update user", error);
    throw error;
  }
}

async function getUserByUsername(username) {
  //  select a user using the user's username
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
        `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("could not get user by username", error);
    throw error;
  }
}

async function createGuestUser({ zip, isAdmin = false, isUser = false }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (zip, "isAdmin", "isUser")
      VALUES($1, $2, $3) 
      RETURNING *;
        `,
      [zip, isAdmin, isUser]
    );

    console.log(user, "guest user");
    return user;
  } catch (error) {
    throw error;
  }
}

async function destroyUser(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        DELETE FROM users
        WHERE id=$1
        RETURNING *;
        `,
      [userId]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByUsername,
  createGuestUser,
  destroyUser,
};
