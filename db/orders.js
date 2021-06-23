const { client } = require("./client")

async function createOrder({ date_ordered, total_price }) {
    // create and return the new routine
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders(date_ordered, total_price)
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [date_ordered, total_price])

        return order
    } catch (error) {
        throw (error)
    }

}

module.exports = {
    client,
    createOrder,
};