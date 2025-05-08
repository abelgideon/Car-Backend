const Car = require("../models/Car");

const getAllCars = async (req, res) => {
  const { featured, name, sort, select, numericFilters } = req.query;
  const queryObject = {};

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      "<=": "$lte",
      ">=": "$gte",
    };
    const regEx = /\b>|<|>=|<=|=\b/g;
    let filters = numericFilters.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`; // -$gte-
    });

    const options = ["price", "rating"];

    // numericFilter=price-$gt-30,rating-$gt-5
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let results = Car.find(queryObject);

  if (sort) {
    results = results.sort(sort.split(",").join(" "));
  }

  if (select) {
    results = results.select(select.split(",").join(" "));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  results = results.skip(skip).limit(limit);

  const cars = await results;

  res.status(200).json({ nbHits: cars.length, cars });
};

module.exports = getAllCars;
