const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../db");
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
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

usersRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
