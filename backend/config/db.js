const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`MongoDB connected`);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });

module.exports = {};
