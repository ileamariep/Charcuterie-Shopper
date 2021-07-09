const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  // getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
  createGuestUser,
  destroyUser,
} = require("../db");

const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
// const SALT_COUNT = 10;

// create/register user
usersRouter.post("/register", async (req, res, next) => {
  const { email, username, password, address, city, state, zip } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      throw Error("Username already exists.");
    }
    if (password.length < 8) {
      throw Error("Password must be at least 8 characters long.");
    }
    const user = await createUser({
      email,
      username,
      password,
      address,
      city,
      state,
      zip,
    });
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

// login user
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const { isAdminTF } = req.params;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUserByUsername(username);
    console.log(user, "this is the user data");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
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

// update user info - user
usersRouter.patch("/user/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { email, username, password, address, city, state, zip } = req.body;

  const updateFields = {};

  if (email) {
    updateFields.email = email;
  }
  if (username) {
    updateFields.username = username;
  }
  if (password) {
    updateFields.password = password;
  }
  if (address) {
    updateFields.address = address;
  }
  if (city) {
    updateFields.city = city;
  }
  if (state) {
    updateFields.state = state;
  }
  if (zip) {
    updateFields.zip = zip;
  }

  try {
    const _user = await getUserById(id);
    if (!_user) {
      throw Error("User not found.");
    }
    const updatedUser = await updateUser(id, updateFields);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

// update user info admin status - admin
usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const updateFields = {
      isAdmin: isAdmin,
    };
    const updatedUser = await updateUser(id, updateFields);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

// get all users for admin
usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
});

// get user info for myaccount
usersRouter.get("/me", async (req, res, next) => {
  //  Send back the logged-in user's data if a valid token is supplied in the header.
  try {
    res.send(req.user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRouter.get("/:userId/users", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// usersRouter.get("/", requireAdmin, async (req, res) => {
//   const users = await getAllUsers();
//   if (req.role !== "isAdmin") {
//     return res.status(403).send("Unauthorized");
//   }
//   res.send({
//     users,
//   });
// });

usersRouter.post(`/guest/:zip`, async (req, res, next) => {
  const { zip } = req.params;
  try {
    const user = await createGuestUser({
      zip,
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// delete user
usersRouter.delete("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const deleteUser = await destroyUser(userId);
    res.send(deleteUser);
  } catch (error) {
    next(error);
  }
});

// usersRouter.post(`/guest/:zip`, async (req, res, next) => {
//   const { zip } = req.body;
//   try {
//     const user = await createGuestUser({
//       zip,
//     });
//     if (!user.isUser) {
//       const token = jwt.sign(
//         {
//           id: user.id,
//           zip,
//         },
//         JWT_SECRET,
//         {
//           expiresIn: "1w",
//         }
//       );
//       res.send({
//         user,
//         token,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = usersRouter;
