const express = require("express");
const cors = require("cors");

const Logs = require("./models/Logs");
const access = require("./middleware/access");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json({ extended: false, limit: "250mb" }));

app.use("/roamingStammer", access, require("./api/roamingStammer"));

app.listen(port, async () => {
  await Logs.create({ msg: `Server Started: ${port}` });
});
