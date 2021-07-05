const { client } = require("./client");
// const { createReview } = require("./reviews");
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  getUserByUsername,
} = require("./users");

const {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrderByUser,
} = require("./orders");

const {
  createIngredient,
  getAllIngredients,
  getIngredientbyId,
  updateIngredient,
  destroyIngredient,
  ingredientByCategory,
} = require("./ingredients");
const { logDOM } = require("@testing-library/react");

// const { createCartItem } = require("./cartItems");

async function buildTables() {
  try {
    // drop tables in correct order
    console.log("Starting to drop tables...");
    client.query(`
        DROP TABLE IF EXISTS cart_items;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS ingredients;
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
          address VARCHAR(255),
          city VARCHAR(255),
          state VARCHAR(255),
          zip VARCHAR(255),
          "isAdmin" BOOLEAN DEFAULT false,
          "isUser" BOOLEAN DEFAULT false
        );

        CREATE TABLE ingredients (
          id SERIAL PRIMARY KEY,
          name varchar(30) UNIQUE,
          description VARCHAR(255),
          price MONEY,
          category text,
          "stockQty" INTEGER DEFAULT 0,
          img TEXT,
          "imgAlt" TEXT
        );
        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            date_ordered VARCHAR(255) NOT NULL,
            total_price INTEGER
          );
        CREATE TABLE cart_items(
          id SERIAL PRIMARY KEY,
          quantity INTEGER,
          "ingredientId" INTEGER REFERENCES ingredients(id),
          "orderId" INTEGER REFERENCES orders(id),
          "usersId" INTEGER REFERENCES users(id)
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
        name: "Elixir Cure All",
        description: "This elixir will cure everything",
        price: 5,
        category: "general",
        stockQty: 50,
      },
      {
        name: "Elixir Weight",
        description: "Lose weight with this elixr",
        price: 6,
        category: "weight",
        stockQty: 50,
      },
      {
        name: "Pet Mange Elixir",
        description: "This will get rid of all the mange!",
        price: 7,
        category: "pets",
        stockQty: 50,
        img: "/images/elixir1Test.png",
        imgAlt: "dog mange elixir",
      },
      {
        name: "Hair Loss Elixir",
        description: "Get a head full of new hair in 10 days",
        price: 10,
        category: "hair loss",
        stockQty: 50,
      },
    ];

    const theIngredients = await Promise.all(
      ingredientsToCreate.map((ingredient) => createIngredient(ingredient))
    );
    console.log("Ingredients Created: ", theIngredients);
    console.log("Finished creating ingredients.");
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
      {
        email: "ileamarie@gmail.com",
        name: "ilea petsel",
        password: "123456789",
        username: "ileamarie",
        address: "4789 Atlantic Blvd",
        city: "Mayport",
        state: "FL",
        zip: "32205",
        isAdmin: true,
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

// async function createInitialCartItems() {
//   try {
//     console.log("starting to create cartItems...");
//     const [user1, user2, user3] = await getAllUsers();
//     const [ing1, ing2, ing3] = await getAllIngredients();

//     const cartItemsToCreate = [
//       {
//         usersId: user1.id,
//         ingredientId: ing1.id,
//         quantity: 1,
//         orderId: null,
//       },
//       {
//         usersId: user2.id,
//         ingredientId: ing2.id,
//         quantity: 6,
//         orderId: null,
//       },
//       {
//         usersId: user3.id,
//         ingredientId: ing3.id,
//         quantity: 3,
//         orderId: null,
//       },
//     ];
//     const cartItems = await Promise.all(cartItemsToCreate.map(createCartItem));
//     console.log("cart items created: ", cartItems);
//     console.log("Finished creating cartItems!");
//   } catch (error) {
//     throw error;
//   }
// }
// async function populateInitialReviews() {
//     try {
//         console.log("starting to create reviews...");
//         const reviewToCreate = [
//             { usersCommentId: 1, comment: "omg so good!" },
//             { usersCommentId: 2, comment: "delicious and spicy salami" },
//             { usersCommentId: 3, comment: "best cheese ever!" },
//             { usersCommentId: 2, comment: "yummy olives!" },
//         ];
//         const review = await Promise.all(reviewToCreate.map(createReview));
//         console.log("Review Created:", review);
//         console.log("Finished creating review.");
//     } catch (error) {
//         throw error;
//     }
// }

async function rebuildDB() {
  try {
    client.connect();
    console.log("starting to build tables in rebuildDB");
    await buildTables();
    console.log("starting to populate initial ingredients in rebuildDB");
    await populateInitialIngredients();
    console.log("starting to populate initial Users in rebuildDB");
    await populateInitialUsers();
    console.log("starting to populate initial cartitems in rebuildDB");
    // await createInitialCartItems();
    console.log("starting to populate initial orders in rebuildDB");
    await populateInitialOrders();
    console.log("starting to populate initial cart items in rebuildDB");
    // await populateInitialCart();
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
    console.log("555 user by email Result:", singleEmail);
    console.log("Calling getUserById with 1");
    const singleUser = await getUserById(1);
    console.log("444 user by id Result:", singleUser);
    console.log("Calling update user");
    const updatedUserData = await updateUser(users[0].id, {
      username: "xtina",
    });
    console.log("333 Result:", updatedUserData);
    const username = await getUserByUsername(users[1].username);
    console.log("222 user by username Result:", username);
    console.log("Calling getUserByUsername with 1");
    console.log("Starting to test ingredients...");
    console.log("Calling getAllIngredients");
    const ingredients = await getAllIngredients();
    console.log("Get All Ingredients Result:", ingredients);
    console.log("Calling getIngredientById with 1");
    const singleIngredient = await getIngredientbyId(1);
    console.log("Result:", singleIngredient);
    console.log("Calling updateIngredient on ingredient[0]");
    const updatedIngredient = await updateIngredient(ingredients[0].id, {
      name: "New Elixir",
      description: "Updated elixir",
      price: 1,
      category: "test",
      stockQty: 4,
      img: "fjkdlafjd",
      imgAlt: 'hehehe',

    });

    console.log("Result:", updatedIngredient);
    console.log("Testing delete ingredient");
    const deleteIngredient = await destroyIngredient(2);
    console.log("deleted ingredient #2", deleteIngredient);

    console.log("Calling getIngredientByCategory with fruit");
    const ingredientsWithFruit = await ingredientByCategory("pets");
    console.log("Result:", ingredientsWithFruit);

    // console.log("Calling getAllorders");
    // const theOrders = await getAllOrders()
    // console.log(theOrders, "please for the love of god")
    // const orderId = await getOrderById(2)
    // console.log(orderId, "please for the love of god")

    // const usersOrder = await getOrderByUser()
    // console.log(usersOrder, "This is smashleys order")

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during TestDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
