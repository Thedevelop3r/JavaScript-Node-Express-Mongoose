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
    `<h1>Store Api <br><a href="api/v1/products"> Product Routes </a> </h1><br>
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





























// app.use("/api/generate/data", (req, res) => {
//   // let array to store json data

//   res.status(200).json({
//     status:'Data Generator Running',
//     fuel : 70,
//     unit: 'liters'
//   });
// });

// function generateData() {
//   let data = [];
//   const alphabets = [
//     "a",
//     "b",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//   ];

//   function randomNumber(size) {
//     return Math.floor(Math.random() * size);
//   }

//   const alphabetSize = alphabets.length;
//   const vovels = ["a", "e", "i", "o", "u"];
//   const vovelssize = vovels.length;
//   let peoples = [];
//   let index = 0;
//   const PEOPLESIZE = 800;
//   for (let i = 0; i <= PEOPLESIZE; i++) {
//     let firstname = "";
//     let lastname = "";
//     let disscription = "";

//     for (let a = 0; a <= 5; a++) {
//       if (a == 0) {
//         firstname += alphabets[randomNumber(alphabetSize)];
//         lastname += vovels[randomNumber(vovelssize)];
//       }
//       if (a == 1) {
//         firstname += vovels[randomNumber(vovelssize)];
//         lastname += alphabets[randomNumber(alphabetSize)];
//       }
//       if (a == 2) {
//         firstname += vovels[randomNumber(vovelssize)];
//         lastname += alphabets[randomNumber(alphabetSize)];
//       }

//       firstname += alphabets[randomNumber(alphabetSize)];
//       lastname += alphabets[randomNumber(alphabetSize)];
//     }
//     for (let b = 0; b < 700; b++) {
//       disscription += alphabets[randomNumber(alphabetSize)];
//     }
//     let person = {
//       id: index,
//       firstname,
//       lastname,
//       disscription,
//     };
//     peoples.push(person);
//     index++;
//   } // main for loop ends

//   return peoples;
// }
