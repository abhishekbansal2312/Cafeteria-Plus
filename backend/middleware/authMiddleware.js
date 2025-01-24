const verifyToken = (req, res, next) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = {
  verifyToken,
};
