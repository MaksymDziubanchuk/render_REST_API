const mongoose = require("mongoose");
require("dotenv").config();
const { HOST_DB } = process.env;
const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect(HOST_DB)
  .then(app.listen(3000, console.log("Database connection successful")))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
