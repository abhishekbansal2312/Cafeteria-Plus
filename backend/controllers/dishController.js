const Dish = require("../models/dishModel");
const Counter = require("../models/counterModel");

const createDish = async (req, res) => {
  try {
    const { counterId } = req.params;

    const { name, description, price, image, category, availability } =
      req.body;

    const counterExists = await Counter.findById(counterId);

    if (!counterExists) {
      return res.status(400).json({ message: "Invalid Counter ID" });
    }

    const newDish = new Dish({
      name,
      description,
      price,
      image,
      category,
      counter: counterId,
      availability,
    });

    const savedDish = await newDish.save();

    res.status(201).json({
      dish: savedDish,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating dish", error: error.message });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate("counter");
    res.status(200).json(dishes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving dishes", error: error.message });
  }
};

const getDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id).populate(
      "counter",
      "counter_name location"
    );

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving dish", error: error.message });
  }
};

const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDish = await Dish.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json({
      dish: updatedDish,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating dish", error: error.message });
  }
};

const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDish = await Dish.findByIdAndDelete(id);

    if (!deletedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res
      .status(200)
      .json({ message: "Dish deleted and cart updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting dish and updating cart",
      error: error.message,
    });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
};
