const Counter = require("../models/counterModel");
const filterCounters = () => {
  const role = req.user.role;
  const counter = req.query.counter;
  const filter = {};
  if (counter === "merchant") {
    filter.role = "merchant";
  }
};
