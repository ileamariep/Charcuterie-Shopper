const { client } = require("./client");
const { createReview } = require("./reviews");
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} = require("./users");
const { createIngredient } = require("./ingredients");
const { createOrder, getOrderById } = require("./orders");

async function buildTables() {

    try {
        // drop tables in correct order
        console.log("Starting to drop tables...");
        client.query(`
        DROP TABLE IF EXISTS order_ingredients;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
      `);
    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`
    
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
            "isUser" BOOLEAN DEFAULT false
        );
        CREATE TABLE ingredients (
            id SERIAL PRIMARY KEY,
            name varchar(30) UNIQUE,
            description TEXT NOT NULL,
            price INTEGER,
            quantity INTEGER,
            category text
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        date_ordered VARCHAR(255) NOT NULL,
        total_price INTEGER,
        "usersId" INTEGER REFERENCES users(id)
      );
    
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          comment VARCHAR(255), 
          "usersCommentId" INTEGER REFERENCES users(id)
        );
        
        CREATE TABLE order_ingredients(
        "ingredientId" INTEGER REFERENCES ingredients(id),
        "orderId" INTEGER REFERENCES orders(id),
        "usersId" INTEGER REFERENCES users(id),
        UNIQUE("ingredientId", "orderId", "usersId")
        );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialIngredients() {
  try {
    console.log("starting to create ingredients...");

    const ingredientsToCreate = [
      {
        name: "Grapes",
        description: "green grapes from napa valley",
        price: 5,
        quantity: 2,
        category: "fruit",
      },
      {
        name: "Salami",
        description: "Love me some salami",
        price: 6,
        quantity: 1,
        category: "meat",
      },
      {
        name: "Crackers",
        description: "carbs are yummy",
        price: 7,
        quantity: 1,
        category: "carbs",
      },
    ];

    const theIngredients = await Promise.all(
      ingredientsToCreate.map((ingredient) => createIngredient(ingredient))
    );
    console.log("Ingredients Created: ", theIngredients);
    console.log("Finished creating links.");
  } catch (error) {
    throw error;
  }
}

async function populateInitialUsers() {
  try {
    console.log("starting to create users...");
    const usersToCreate = [
      {
        email: "sharon.mcmanis@gmail.com",
        name: "Sharon McManis",
        password: "123456789",
        username: "sharon82",
        address: "123 Florida Ave",
        city: "Chicago",
        state: "IL",
        zip: "60618",
        isAdmin: true,
      },
      {
        email: "ashley.mcmanis@gmail.com",
        name: "Ashley Roland",
        password: "123456789",
        username: "smashley",
        address: "230 Seminole Ave",
        city: "Atlantic Beach",
        state: "FL",
        zip: "32233",
      },
      {
        email: "christina.mcmanis@gmail.com",
        name: "Christina Massey",
        password: "123456789",
        username: "christina81",
        address: "4789 Atlantic Blvd",
        city: "Mayport",
        state: "FL",
        zip: "32205",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("User Created: ", users);
    console.log("Finished creating users.");
  } catch (error) {
    throw error;
  }
}

async function populateInitialOrders() {
  try {
    console.log("starting to create orders...");
    const ordersToCreate = [
      {
        date_ordered: "01/01/2025",
        total_price: 50,
      },
      {
        date_ordered: "01/04/2025",
        total_price: 500,
      },
      {
        date_ordered: "01/03/2025",
        total_price: 5000,
      },
    ];

    const theOrders = await Promise.all(
      ordersToCreate.map((order) => createOrder(order))
    );

    console.log("orders Created: ", theOrders);
    console.log("Finished creating links.");
  } catch (error) {
    throw error;
  }
}

async function populateInitialReviews() {
  try {
    console.log("starting to create reviews...");
    const reviewToCreate = [
      { usersCommentId: 1, comment: "omg so good!" },
      { usersCommentId: 2, comment: "delicious and spicy salami" },
      { usersCommentId: 3, comment: "best cheese ever!" },
      { usersCommentId: 2, comment: "yummy olives!" },
    ];
    const review = await Promise.all(reviewToCreate.map(createReview));
    console.log("Review Created:", review);
    console.log("Finished creating review.");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await buildTables();
    await populateInitialIngredients();
    await populateInitialUsers();
    await populateInitialReviews();
    await populateInitialOrders();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");
    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("666 Get All users Result:", users);
    console.log("Calling getUserByEmail with 1");
    const singleEmail = await getUserByEmail(users[1].email);
    console.log("555 Result:", singleEmail);
    console.log("Calling getUserById with 1");
    const singleUser = await getUserById(1);
    console.log("444 Result:", singleUser);
    console.log("Calling update user");
    const updatedUserData = await updateUser(users[0].id, {
      username: "stmstm",
    });
    console.log("333 Result:", updatedUserData);
    //     console.log("Calling getLinkByTagName with network");
    //     const linksWithIlea = await getLinkByTagName("network");
    //     console.log("Result:", linksWithIlea);
    //     console.log("Testing click count update");
    //     const clickedLink = await changeCount(2);
    //     console.log("Clicked Link", clickedLink);
    //     console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
