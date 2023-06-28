const mongoose = require("mongoose");

const parseModel = mongoose.Schema({
  text: {
    type: String,
    required: [true, "The text field is required"],
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "The 'text' field must not be empty.",
    },
  },
});

const parse = mongoose.model("parse", parseModel);
module.exports = parse;
