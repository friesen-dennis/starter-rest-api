const mongoose = require("mongoose");

const logsSchema = mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  enc: Boolean,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = logs = mongoose.model("logs", logsSchema);
