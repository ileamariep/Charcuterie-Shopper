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
});

  
usersRouter.get('/me', requireUser, async (req, res, next) => {

    try {
        res.send(req.user)
    } catch (error) {
        next(error);
    }
});
module.exports = usersRouter;
