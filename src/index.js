const express = require("express");
const router = require("./routes/index");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//set up routes
app.use("/", router);

// Connect to mongoose and start the express server
try {
  mongoose.connect(process.env.DB_URI, { autoIndex: false, dbName: "forums" });
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/graphql`);
  });
} catch (error) {
  console.log(error);
}
