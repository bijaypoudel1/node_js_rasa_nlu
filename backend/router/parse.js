const express = require("express");
const router = express.Router();
const { getParse } = require("../controller/parse");

router.post("/", getParse);
exports.router = router;
