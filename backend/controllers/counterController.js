const Counter = require("../models/counterModel");

const createCounter = async (req, res) => {
  try {
    const {
      merchants,
      counter_name,
      description,
      location,
      imageUrl,
      operating_hours,
    } = req.body;

    const newCounter = new Counter({
      merchants,
      counter_name,
      description,
      location,
      imageUrl,
      operating_hours,
    });

    const savedCounter = await newCounter.save();
    res.status(201).json(savedCounter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating counter", error: error.message });
  }
};

const getAllCounters = async (req, res) => {
  try {
    const counters = await Counter.find()
      .populate("merchants", "name email")
      .populate("dishes");
    res.status(200).json({ data: counters });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving counters", error: error.message });
  }
};

const getCounterById = async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.findById(id)
      .populate("merchants", "name email")
      .populate("dishes");

    if (!counter) {
      return res.status(404).json({ message: "Counter not found" });
    }

    res.status(200).json(counter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving counter", error: error.message });
  }
};

const updateCounter = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCounter = await Counter.findByIdAndUpdate(id, {
      new: true,
    });

    if (!updatedCounter) {
      return res.status(404).json({ message: "Counter not found" });
    }

    res.status(200).json(updatedCounter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating counter", error: error.message });
  }
};

const deleteCounter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCounter = await Counter.findByIdAndDelete(id);

    if (!deletedCounter) {
      return res.status(404).json({ message: "Counter not found" });
    }

    res.status(200).json({ message: "Counter deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting counter", error: error.message });
  }
};

const toggleCounterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.findById(id);

    if (!counter) {
      return res.status(404).json({ message: "Counter not found" });
    }

    counter.isActive = !counter.isActive;
    await counter.save();

    res.status(200).json({
      message: `Counter ${counter.isActive ? "activated" : "deactivated"}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling counter status", error: error.message });
  }
};

const getAllMerchantCounters = async (req, res) => {
  try {
    const merchantId = req.user.id;

    const counters = await Counter.find({ merchants: { $in: [merchantId] } });

    if (counters.length === 0) {
      return res
        .status(404)
        .json({ message: "No counters found for this merchant." });
    }

    return res.status(200).json(counters); // Send counters data back in response
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error retrieving counter", error: error.message });
  }
};

module.exports = {
  createCounter,
  getAllCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  toggleCounterStatus,
  getAllMerchantCounters,
};
