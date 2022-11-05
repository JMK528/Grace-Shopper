const { client } = require('./')

const { createProduct } = require('./products')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS wishlist;
      DROP TABLE IF EXISTS addresses;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    
    console.log('Finished Dropping Tables')
  } 
  catch(ex) {
    console.log('error dropping tables')
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    // add code here
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT true,
        isAdmin BOOLEAN DEFAULT false
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL, 
        description VARCHAR(255)
        price NUMERIC(10,2),
        count INTEGER,
        active BOOLEAN DEFAULT true,
        isPublic BOOLEAN DEFAULT true,
      );

      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description(),
        isPublic BOOLEAN DEFAULT true,        
      );

      CREATE TABLE cart (
        "cartId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES product(id),
        purchased BOOLEAN DEFAULT false,
        total_price NUMERIC(10,2) NOT NULL,
        UNIQUE ("cartId")

      );
      
      CREATE TABLE addresses (
        "userId" INTEGER REFERENCES user(id),
        label VARCHAR(255) NOT NULL,
        street1 VARCHAR(255) NOT NULL,
        street2 VARCHAR(255),
        city VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zip INTEGER NOT NULL,

      );

      CREATE TABLE wishlist (
        "userId" INTEGER REFERENCES user(id),
        "productId" INTEGER REFERENCES product(id)
      )
      



    `)
    
    console.log('Finished Creating Tables')
  } 
  catch(ex) {
    console.log('error creating tables')
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "The first most amazing product",
      description:
        "Description for the first most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The second most amazing product",
      description:
        "Description for the second most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The third most amazing product",
      description:
        "Description for the third most amazing product ever...."
    });
    
    console.log('Finished creating Products')
  } 
  catch(ex) {
    console.log('error creating Products')
  }
}

async function buildDB() {
  try {
    // need to add something here
    client.connect();
    await dropTables();
    await createTables();
    await createInitialProducts();
  }
  catch(ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())
