const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} = require("../db");

const jwt = require("jsonwebtoken");
const { requireUser, requireAdmin } = require("./utils");
const { JWT_SECRET } = process.env;

usersRouter.post("/register", async (req, res, next) => {
  //  Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
  //  Throw errors for duplicate username, or password-too-short.
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      throw Error("Username already exists.");
    }
    if (password.length < 8) {
      throw Error("Password must be at least 8 characters long.");
    }
    const user = await createUser({ username, password });
    if (!user) {
      throw Error(`Error creating user.`);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "You have successfully registered!",
        user,
        token,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUserByUsername(username);
    if (user && user.password == password) {
      // create token & return to user
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
});

module.exports = usersRouter;
