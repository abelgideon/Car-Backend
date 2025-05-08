const express = require("express");
const getAllCars = require("../controllers/cars");
const router = express.Router();

router.get("/", getAllCars);

module.exports = router;
