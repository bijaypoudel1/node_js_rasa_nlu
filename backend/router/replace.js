const express = require("express");
const { getReplaceModel } = require("../controller/replaceModel");

const router = express.Router();
router.post("/", getReplaceModel);
exports.router = router;
