// importing models mongoose schema
const Product = require("../models/product");
// a simple static api search 
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find()
    .sort("name")
    .select("name price company")
    .limit(10)
    .skip(3);

  res
    .status(200)
    .json({ msg: "Products Static Routes", nbHits: products.length, products });
};

// a more complex dynamic search
const getAllProducts = async (req, res) => {
  // destructuring variables from query
  const {
    featured,
    name,
    rating,
    price,
    createdAt,
    company,
    sort,
    fields,
    numericFilters,
  } = req.query;
  // query look
  console.log(req.query);
  // empty query object
  let queryObject = {};

  // setting up query object according to provided variables

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (rating) {
    queryObject.rating = rating;
  }
  if (price) {
    queryObject.price = price;
  }
  if (createdAt) {
    queryObject.createdAt = createdAt;
  }
  if (company) {
    queryObject.company = company;
  }
  // setup regex for numeric values
  if (numericFilters) {
    // map to match operators
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>|<|>=|=|<=)\b/g;
    //replacing matched operators | adding additional -${}-
    let filtered = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // displaying filtered
    console.log(filtered);
    // setting up only options for range queries
    const options = ["price", "rating"];
    // dynamic setup to create a map of query for mongoose
    filtered = filtered.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        // adding a feild into queryobject to sort only in range
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    // displaying how querylooked
    console.log(queryObject);
  }
  // setting up query with desired dynamic filters
  let result = Product.find(queryObject);

  // sorting
  if (sort) {
    const sortedList = sort.split(",").join(" ");
    result = result.sort(sortedList);
  } else {
    result = result.sort("createdAt");
  }
  // fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  // page setup
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  // awaiting results
  const products = await result;
  // sending response back
  res.status(200).json({
    nHits: products.length,
    products,
  });
};

module.exports = { getAllProducts, getAllProductsStatic };
