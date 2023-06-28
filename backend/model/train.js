const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  pipeline: [Object],
  policies: [Object],
  intents: [String],
  entities: [Object],
  slots: Object,
  actions: [Object],
  forms: Object,
  e2e_actions: [Object],
  responses: {
    type: Object,
    default: {},
  },
  session_config: {
    type: Object,
    default: {},
  },
  nlu: [
    {
      intent: {
        type: String,
      },
      examples: {
        type: [String],
      },
    },
  ],
  rules: [
    {
      rule: {
        type: String,
      },
      steps: {
        type: [
          {
            intent: String,
            action: String,
          },
        ],
      },
    },
  ],
  stories: [
    {
      story: {
        type: String,
      },
      steps: {
        type: [
          {
            intent: String,
            action: String,
          },
        ],
      },
    },
  ],
});

const train = mongoose.model("train", trainSchema);
module.exports = train;
