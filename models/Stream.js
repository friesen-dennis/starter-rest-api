const mongoose = require("mongoose");

const streamSchema = mongoose.Schema({
  exhaust: {
    type: String,
    required: true,
  },
  overflow: {
    type: String,
    required: true,
  },
  patchy: Array,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = stream = mongoose.model("Stream", streamSchema);
