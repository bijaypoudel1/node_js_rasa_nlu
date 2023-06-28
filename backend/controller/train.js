const train = require("../model/train");
const axios = require("axios");
// const fs = require("fs");
const yaml = require("js-yaml");
const mongoose = require("mongoose");
require("dotenv").config();
const rasaUrl = process.env.RASA__BASE_URL;

function removeIdKeys(obj) {
  for (let key in obj) {
    if (key === "_id") {
      delete obj[key];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          if (item instanceof mongoose.Document) {
            removeIdKeys(item._doc);
          } else {
            removeIdKeys(item);
          }
        });
      } else if (obj[key] instanceof mongoose.Document) {
        removeIdKeys(obj[key]._doc);
      } else {
        removeIdKeys(obj[key]);
      }
    }
  }
}

exports.getTrainData = async (req, res) => {
  const trainDataFromDb = await train.find();
  removeIdKeys(trainDataFromDb);
  const jsonObject = JSON.parse(JSON.stringify(trainDataFromDb));
  const yamlContent = yaml.dump(jsonObject[0], {
    skipInvalid: true,
  });
  // const yamlContent = YML.stringify(jsonObject[0]);
  const modifiedData = yamlContent.replace(
    /examples:\n(\s+- .*)/g,
    "examples: |\n$1"
  );
  // fs.writeFileSync("data.json", JSON.stringify(jsonObject));
  // fs.writeFileSync("data.yml", modifiedData);
  axios
    .post(
      `${rasaUrl}/model/train?save_to_default_model_directory=true`,
      modifiedData
    )
    .then((response) => {
      console.log(typeof response.data);
      // console.log(response.data);
      return res.json({ sucess: response.headers });
    })
    .catch((error) => {
      // console.error(error);
      return res.json({ message: JSON.stringify(error) });
    });
};
