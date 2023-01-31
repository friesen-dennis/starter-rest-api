const Env = require("../models/Env");
const Logs = require("../models/Logs");

const setEnvVariables = async () => {
  try {
    const env = await Env.find();
    env.forEach((vars) => {
      if (process.env[`${vars.variableName}`] === vars.variableName) {
        process.env[`${vars.variableName}`] = vars.variableValue;
      }
    });
    await Logs.create({ msg: "Env Variables Set Successfully..." });
    require("../app");
  } catch (error) {
    await Logs.create({
      msg: `Error(config/setEnvVariables.js): ${error.message}`,
    });
  }
};

module.exports = setEnvVariables;
