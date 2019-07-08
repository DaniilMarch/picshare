const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Importing routes
const images = require("./routes/api/images");
const profiles = require("./routes/api/profiles");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const db = require("./config/keys").mongoDB;

//Connecting database
mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//Test route
app.get("/test", (req, res) => res.json({ msg: "test route works!" }));

//Connecting routes
app.use("/api/images", images);
app.use("/api/profiles", profiles);

app.listen(port, () => console.log(`Server running on port ${port}`));
