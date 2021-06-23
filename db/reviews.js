const { client } = require("./client");

async function createReview({ comment, usersCommentId }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
          INSERT INTO reviews(comment, "usersCommentId")
          VALUES ($1, $2)
          RETURNING *
          `,
      [comment, usersCommentId]
    );
    console.log(review, "my review");
    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createReview,
};
