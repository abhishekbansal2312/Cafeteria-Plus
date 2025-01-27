const filterUsers = (model) => (req, res, next) => {
  const { role, email, isActive } = req.query;
  let filter = {};

  if (role) {
    filter.role = role;
  }
  if (email) {
    filter.email = { $regex: email, $options: "i" }; // Case-insensitive regex search
  }
  if (isActive !== undefined) {
    filter.isActive = isActive === "true"; // Convert to boolean
  }

  req.filter = filter; // Store filter in request object
  req.model = model; // Attach model to request object

  next();
};

module.exports = filterUsers;
