const mongoose = require("mongoose");

const streamSchema = mongoose.Schema({
  exhaust: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = stream = mongoose.model("Stream", streamSchema);
