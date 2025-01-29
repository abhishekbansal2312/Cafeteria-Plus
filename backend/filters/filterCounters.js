const filterCounters = (model) => (req, res, next) => {
  const { search } = req.query;
  let filter = {};
  if (search != null && search !== "") {
    filter.counter_name = { $regex: search, $options: "i" };
  }
  req.filter = filter;
  req.model = model;

  next();
};

module.exports = filterCounters;
