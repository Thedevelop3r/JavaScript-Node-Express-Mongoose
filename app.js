require("dotenv").config(); // for env variables
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const app = express();
// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `
    <h1>Store Api <br><a href="api/v1/products"> Product Routes </a> </h1><br>
    '<h1>Store Api Static <br><a href="api/v1/products/static"> Product Routes Static </a> </h1>
    <br>
    <h1>Products sorted by name <a href="api/v1/products?sort=name"> sort </a></h1><br>
    <h1>Products sorted by price <a href="api/v1/products?sort=price"> sort </a></h1><br>
    <h1>Only Show Name, Price, Company <a href="api/v1/products?fields=name,price,company"> show </a></h1><br>
    <h1>Products sorted by price less then 40 <a href="api/v1/products?numericFilters=price<40"> sort </a></h1><br>
    `
  );
});

app.use("/api/v1/products", productsRouter);
app.use([notFoundMiddleware, errorMiddleware]);

const PORT = process.env.PORT || 3000;

const StartServer = async () => {
  try {
    await connectDB(process.env.DBCONNECT).then(() => {
      console.log("Mongoose Database Connected Successfully..");
    });
    app.listen(PORT, () => {
      console.log(`Server Listening at Port ${PORT} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();
// hellow
