const parse = require("../model/parse");
const axios = require("axios");
const Parse = require("../model/parse");
require("dotenv").config();
const rasaUrl = process.env.RASA__BASE_URL;

exports.getParse = async (req, res) => {
  const { text } = req.body;
  try {
    const parseData = new Parse({ text });
    await parseData.validate();

    axios
      .post(`${rasaUrl}/model/parse`, req.body)
      .then((response) => {
        return res.json({ success: response.data });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        return res.json({ error: JSON.stringify(err) });
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
