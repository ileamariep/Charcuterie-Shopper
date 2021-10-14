const { Client } = require('pg');
const DB_NAME = 'localhost:5432/charcuterie';
const DB_URL =
  `${process.env.DATABASE_URL}?sslmode=require` || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

module.exports = {
  client,
};
