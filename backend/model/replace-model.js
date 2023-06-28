const mongoose = require("mongoose");

const replaceModel = mongoose.Schema({
  model_file: {
    type: String,
    required: [true, "The model file path is required"],
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "The model file path must not be empty.",
    },
  },
});

const replace = mongoose.model("replace", replaceModel);
module.exports = replace;
