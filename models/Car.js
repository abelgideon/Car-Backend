const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  price: Number,
  featured: Boolean,
  rating: Number,
  company: {
    type: String,
    enum: {
      values: ["tesla", "bmw", "toyota", "audi"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Car", carSchema); // cars
