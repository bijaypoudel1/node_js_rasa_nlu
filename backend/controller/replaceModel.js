const axios = require("axios");
const Replace = require("../model/replace-model");
const rasaUrl = process.env.RASA__BASE_URL;

exports.getReplaceModel = async (req, res) => {
  const { model_file } = req.body;
  try {
    const replaceData = new Replace({ model_file });
    await replaceData.validate();
    axios
      .put(`${rasaUrl}/model`, req.body)
      .then((response) => {
        console.log("response.statusCode", response.status);
        response.status === 204
          ? res.json({ success: true })
          : res.status(400).send("Bad Request");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        return res.json({ error: JSON.stringify(err) });
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
