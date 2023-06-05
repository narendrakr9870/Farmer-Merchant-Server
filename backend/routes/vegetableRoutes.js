const express = require("express");
const router = express.Router();

const { getVegetables } = require("../controller/vegetableController");
router.get("/getAllVegetables", getVegetables);

module.exports = router;