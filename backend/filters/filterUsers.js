const filterUsers = (model) => (req, res, next) => {
  const { role, search, isActive } = req.query;
  let filter = {};
  if (search != null && search !== "") {
    filter.name = { $regex: search, $options: "i" };
  }
  if (role) {
    filter.role = role;
  }

  req.filter = filter;
  req.model = model;

  next();
};

module.exports = filterUsers;
