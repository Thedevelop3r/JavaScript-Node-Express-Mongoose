require("dotenv").config();

const { json } = require("express");
const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.DBCONNECT).then(() => {
      console.log("Successfully connect to Mongoose Database.");
    });
    console.log(jsonProducts);
    console.log("\n\n");
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Data has been created successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
