const encData = require("../functions/encData");
const Logs = require("../models/Logs");

const roamingStammer = async (req, res) => {
  try {
    const encryptedData = await encData(
      req.zombie,
      JSON.stringify({
        glorify: process.env.GLORIFY,
        outfield: process.env.OUTFIELD,
        hardended: process.env.HARDENED,
        cubbyhole: process.env.CUBBYHOLE,
        daylight: process.env.DAYLIGHT,
      })
    );
    if (encryptedData.status) {
      res.status(200).json({ message: encryptedData.message });
    } else {
      await Logs.create({
        msg: `Error encrypting data: ${encryptedData.message}`,
      });
      res.status(400).json({ message: "Something Went Wrong" });
    }
  } catch (error) {
    await Logs.create({
      msg: `Error(api/roamingStammer): ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

module.exports = roamingStammer;
