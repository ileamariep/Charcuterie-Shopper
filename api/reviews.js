const express = require("express");
const reviewsRouter = express.Router();
const { requireUser } = require("./utils");
const { createReview } = require("../db");

reviewsRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

reviewsRouter.post("/", requireUser, async (req, res, next) => {
  //  Create a review
  const { comment } = req.body;
  const insertReview = {};
  try {
    insertReview.usersCommentId = req.user.id;
    insertReview.comment = comment;

    const review = await createReview(insertReview);

    res.send(review);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = reviewsRouter;
