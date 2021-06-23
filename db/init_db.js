
const {
    client,
} = require("./client");


async function buildTables() {
    try {
        // drop tables in correct order
        console.log("Starting to drop tables...");
        client.query(`
   
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);
        console.log("Finished dropping tables!");

        // build tables in correct order
        console.log("Starting to build tables...");

        await client.query(`
  
      CREATE TABLE links(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          "mainLink" TEXT NOT NULL,
          count INTEGER DEFAULT 0,
          comment VARCHAR(255),
          share_date varchar(14) default to_char(CURRENT_DATE, 'yyyy / mm / dd')
          
      );
  
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name varchar(25) UNIQUE
      );
  
      CREATE TABLE link_tags(
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE("linkId","tagId")
    );
  
    `);

        console.log("Finished building tables!");
    } catch (error) {
        throw error;
    }
}

async function populateInitialIngredients() {
    try {
        // console.log("starting to create links...");

        // const linksToCreate = [
        //     {
        //         name: "FullStack Academy",
        //         mainLink: "https://www.fullstackacademy.com",
        //         comment: "Love this site.",
        //         tags: ["school"],
        //     },
        //     {
        //         name: "LinkedIn",
        //         mainLink: "https://www.linkedin.com/",
        //         comment: "Great for networking.",
        //         tags: ["network"],
        //     },
        //     {
        //         name: "DEV",
        //         mainLink: "https://dev.to/",
        //         comment: "Fantastic dev community, lots of great info.",
        //         tags: ["community", "network"],
        //     },
        // ];

        // const links = await Promise.all(
        //     linksToCreate.map((link) => createLink(link))
        // );
        // console.log("Links Created: ", links);
        // console.log("Finished creating links.");
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
        console.log("starting to create links...");


        console.log("Links Created: ",);
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