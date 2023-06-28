const express = require("express");
const mongoose = require("mongoose");
const trainRoute = require("./router/tran");
const parseRoute = require("./router/parse");
const replaceRoute = require("./router/replace");
require("dotenv").config();

const server = express();

// parse body before using body from response
server.use(express.json());

// connect db
const mongoUserName = process.env.MONGO_USER;
const mongoPass = process.env.MONOGO_PASS;
async function main() {
  await mongoose.connect(
    `mongodb+srv://${mongoUserName}:${mongoPass}@cluster0.5oj1clv.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log("connected");
  server.listen(8080, () => {
    console.log("server listening");
  });
}
main().catch((e) => console.log(e));

server.use("/train", trainRoute.router);
server.use("/parse", parseRoute.router);
server.use("/replace-model", replaceRoute.router);
