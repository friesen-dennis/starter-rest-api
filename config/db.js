const mongoose = require("mongoose");
const Logs = require("../models/Logs");

module.exports = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to database...");
      Logs.create({ msg: "database connected..." });
      require("./setEnvVariables")();
    })
    .catch((error) => {
      console.log("connection to database failed!");
      Logs.create({ msg: `Error(config/db.js): ${error.message}` });
      process.exit(1);
    });
};
