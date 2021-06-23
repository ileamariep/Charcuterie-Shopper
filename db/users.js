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
}) {
  //  make sure to hash the password before storing it to the database
  try {
    // const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (email, username, password, address, city, state, zip)
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
              `,
      [email, username, password, address, city, state, zip]
    );
    // password = hashedPassword;
    delete user.password;
    console.log(user, "my user");
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
};
