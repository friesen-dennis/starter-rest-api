const mongoose = require("mongoose");

const streamSchema = mongoose.Schema({
  exhaust: {
    type: String,
    required: true,
  },
  overflow: {
    type: String,
    unique: true,
    required: true, //todo get this from device side(random string of 15 characters it should be same for all request for that installation on particuler device)
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = stream = mongoose.model("Stream", streamSchema);
