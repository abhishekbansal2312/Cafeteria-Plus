const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./config/db");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const dishRoutes = require("./routes/dishRoutes");
const counterRoutes = require("./routes/counterRoutes");

app.use("/api/users", userRoutes);
// app.use("/api/dishes", dishRoutes);
// app.use("/api/counters", counterRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
