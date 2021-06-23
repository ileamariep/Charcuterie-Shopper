
const {
    client,
} = require("./client");

const { createIngredient } = require('./ingredients');
const { createOrder } = require('./orders');



async function buildTables() {
    try {
        // drop tables in correct order
        console.log("Starting to drop tables...");
        client.query(`
   
      DROP TABLE IF EXISTS ingredients;
  
    `);
        console.log("Finished dropping tables!");

        // build tables in correct order
        console.log("Starting to build tables...");

        await client.query(`
  
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
        "ingredientId" INTEGER REFERENCES ingredients(id),
        "usersId" INTEGER REFERENCES users(id),
        UNIQUE("ingredientId", "usersId")
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
        console.log("starting to create links...");


        console.log("Links Created: ",);
        console.log("Finished creating links.");
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




async function rebuildDB() {
    try {
        client.connect();

        await buildTables();

        await populateInitialIngredients();

        await populateInitialUsers();

        await populateInitialOrders();
    } catch (error) {
        console.log("Error during rebuildDB");
        throw error;
    }
}

async function testDB() {
    // try {
    //     console.log("Starting to test database...");

    //     console.log("Calling getAllLinks");
    //     const links = await getAllLinks();
    //     console.log("Get All Links Result:", links);


    //     console.log("Calling getLinkById with 1");
    //     const singleLink = await getLinkById(1);
    //     console.log("Result:", singleLink);

    //     console.log("Calling getLinkByTagName with network");
    //     const linksWithIlea = await getLinkByTagName("network");
    //     console.log("Result:", linksWithIlea);

    //     console.log("Testing click count update");
    //     const clickedLink = await changeCount(2);
    //     console.log("Clicked Link", clickedLink);

    //     console.log("Finished database tests!");
    // } catch (error) {
    //     console.log("Error during testDB");
    //     throw error;
    // }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());