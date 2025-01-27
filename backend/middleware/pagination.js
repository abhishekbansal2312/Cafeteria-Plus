const paginate = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page, 10);
    const lim = parseInt(limit, 10);

    if (isNaN(pageNum) || isNaN(lim) || pageNum <= 0 || lim <= 0) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    const filter = req.filter || {};
    const model = req.model;

    if (!model) {
      return res.status(500).json({ message: "Model not found in request" });
    }

    const totalResults = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / lim);
    const startIndex = (pageNum - 1) * lim;

    const results = await model
      .find(filter)
      .skip(startIndex)
      .limit(lim)
      .select("-password");

    res.paginationResult = {
      results,
      totalPages,
      totalResults,
      currentPage: pageNum,
      nextPage: pageNum < totalPages ? pageNum + 1 : null,
      prevPage: pageNum > 1 ? pageNum - 1 : null,
    };

    next();
  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({ message: "Error applying pagination", error });
  }
};

module.exports = paginate;
