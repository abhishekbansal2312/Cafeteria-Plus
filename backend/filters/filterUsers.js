const filterUsers = (model) => (req, res, next) => {
  const { role, email, isActive } = req.query;
  let filter = {};

  if (role) {
    filter.role = role;
  }
  if (email) {
    filter.email = { $regex: email, $options: "i" };
  }
  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  req.filter = filter;
  req.model = model;

  next();
};

module.exports = filterUsers;
