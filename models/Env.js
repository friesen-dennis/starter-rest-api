const mongoose = require("mongoose");

const envSchema = mongoose.Schema({
  variableName: String,
  variableValue: String,
});

module.exports = env = mongoose.model("Env", envSchema);
