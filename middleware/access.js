const axios = require("axios");

const decData = require("../functions/decData");
const encData = require("../functions/encData");

const Logs = require("../models/Logs");
const Stream = require("../models/Stream");

const access = async (req, res, next) => {
  try {
    let decryptedData = await decData(
      process.env.CURLER,
      process.env.LUKEWARM,
      req.body.exhaust
    );
    decryptedData = JSON.parse(decryptedData);

    let bungas =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.ip ||
      "";
    decryptedData.ip = bungas;

    let exhaust = await encData(
      process.env.CUBBYHOLE,
      JSON.stringify(decryptedData)
    );
    exhaust = exhaust.message;
    Stream.create({
      exhaust,
    });

    let response = await axios.get(`http://ip-api.com/json/${bungas}`);
    const shakyArr = process.env.SHAKY.split("_");
    shakyArr.map((shakyName) => {
      if (
        shakyName.toLowerCase() === response.data.country.toLowerCase() ||
        shakyName.toLowerCase() ===
          response.data.country.split(" ").join("").toLowerCase()
      ) {
        req.zombie = decryptedData.zombie;
        next();
      }
    });
  } catch (error) {
    await Logs.create({ msg: `Error(middleware/access): ${error.message}` });
  }
};

module.exports = access;
