const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
require("./config/db");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const dishRoutes = require("./routes/dishRoutes");
const counterRoutes = require("./routes/counterRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/dishes", dishRoutes);
app.use("/api/counters", counterRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
