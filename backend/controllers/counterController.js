const Counter = require("../models/counterModel");
const Dish = require("../models/dishModel");
const User = require("../models/userModel");

const StringToArray = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str;
  return str.split(",").map((item) => item.trim());
};

const createCounter = async (req, res) => {
  try {
    const {
      counter_name,
      description,
      location,
      imageUrl,
      operating_hours,
      theme,
      isActive,
    } = req.body;
    const arrayTheme = StringToArray(theme);
    const newCounter = new Counter({
      counter_name,
      description,
      location,
      imageUrl,
      operating_hours,
      theme: arrayTheme,
      isActive,
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
    if (!res.paginationResult || res.paginationResult.results.length === 0) {
      return res.status(404).json({ message: "No Counters found" });
    }

    const counters = await Counter.find({
      _id: { $in: res.paginationResult.results },
    })
      .populate("merchants", "name email")
      .populate("reviews", "title rating comment");

    res.paginationResult.results = counters;

    res.status(200).json({ pagination: res.paginationResult });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving counters", error: error.message });
  }
};

const getCounterById = async (req, res) => {
  try {
    const { id } = req.params;

    const counter = await Counter.findById(id).populate(
      "merchants",
      "name email"
    );

    if (!counter) {
      return res.status(404).json({ message: "Counter not found" });
    }
    const dishes = await Dish.find({ counter: id }).populate("counter");

    res.status(200).json({ counter, dishes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving counter", error: error.message });
  }
};

const updateCounter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      counter_name,
      description,
      location,
      imageUrl,
      operating_hours,
      theme,
      isActive,
    } = req.body;

    const arrayTheme = theme ? StringToArray(theme) : undefined;

    const updatedCounter = await Counter.findByIdAndUpdate(
      id,
      {
        counter_name,
        description,
        location,
        imageUrl,
        operating_hours,
        ...(arrayTheme && { theme: arrayTheme }),
        isActive,
      },
      { new: true }
    );

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

    const counter = await Counter.findById(id);
    if (!counter) {
      return res.status(404).json({ message: "Counter not found" });
    }

    const dishes = await Dish.find({ counter: id });
    const dishIds = dishes.map((dish) => dish._id);

    if (dishIds.length > 0) {
      await User.updateMany(
        { "cart.dish": { $in: dishIds } },
        { $pull: { cart: { dish: { $in: dishIds } } } }
      );

      await Dish.deleteMany({ counter: id });
    }
    await Counter.findByIdAndDelete(id);

    res.status(200).json({
      message: "Counter and its dishes deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting counter", error: error.message });
  }
};

const getAllMerchantCounters = async (req, res) => {
  try {
    const merchantId = req.user.id;

    const counters = await Counter.find({
      merchants: { $in: [merchantId] },
    }).populate("merchants", "name email");

    if (counters.length === 0) {
      return res
        .status(404)
        .json({ message: "No counters found for this merchant." });
    }

    return res.status(200).json(counters);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error retrieving counter", error: error.message });
  }
};

const addMerchantInCounter = async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.findById(id);
    const { merchantIds } = req.body;

    if (!counter) {
      return res.status(404).json({ message: "Counter not found" });
    }
    const uniqueMerchantIds = [...new Set(merchantIds)];

    const merchants = await User.find({ _id: { $in: uniqueMerchantIds } });
    const validMerchantIds = merchants.map((merchant) =>
      merchant._id.toString()
    );

    if (validMerchantIds.length !== uniqueMerchantIds.length) {
      return res.status(400).json({ message: "Some merchants were not found" });
    }

    counter.merchants = validMerchantIds;

    await counter.save();
    res.status(200).json({
      message: "Merchants added successfully",
      counter: counter,
      merchants: merchants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding merchants to counter",
      error: error.message,
    });
  }
};

const getMerchants = async (req, res) => {
  try {
    const merchants = await User.find({ role: "merchant" });

    res.status(200).json({
      merchants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving merchants",
      error: error.message,
    });
  }
};

module.exports = {
  createCounter,
  getAllCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  getAllMerchantCounters,
  addMerchantInCounter,
  getMerchants,
};
