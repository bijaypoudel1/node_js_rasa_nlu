const express = require("express");
const router = express.Router();
const { getTrainData } = require("../controller/train");

router.get("/", getTrainData);

exports.router = router;
