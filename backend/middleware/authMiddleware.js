const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = header.split(" ")[1];
  console.log(token);
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token." });
    } else {
      return res.status(400).json({ message: "Authentication failed." });
    }
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = header.split(" ")[1];
  console.log(token);
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    console.log(verified);

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only." });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token." });
    } else {
      return res.status(400).json({ message: "Authentication failed." });
    }
  }
};

module.exports = { verifyToken, verifyTokenAndAdmin };
