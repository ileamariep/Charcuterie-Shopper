const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

//Routers
const apiRouter = express.Router();
const usersRouter = require("./users");
const ingredientsRouter = require("./ingredients");
const ordersRouter = require("./orders");
const cartItemsRouter = require("./cartItems")
const reviewsRouter = require("./reviews");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/ingredients", ingredientsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("./cartItems.js", cartItemsRouter)
apiRouter.use("/reviews", reviewsRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
