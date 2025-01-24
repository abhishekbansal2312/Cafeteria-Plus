const jwt = require("jsonwebtoken");

const authenticateToken = (req, res) => {
  const header = req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return {
      error: { status: 401, message: "Access denied. No token provided." },
    };
  }

  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return { user: verified };
  } catch (error) {
    console.error("JWT Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return {
        error: { status: 401, message: "Token expired. Please log in again." },
      };
    } else if (error.name === "JsonWebTokenError") {
      return { error: { status: 400, message: "Invalid token." } };
    } else {
      return { error: { status: 400, message: "Authentication failed." } };
    }
  }
};

const verifyToken = (req, res, next) => {
  const result = authenticateToken(req, res);

  if (result.error) {
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  }

  req.user = result.user;
  next();
};

const verifyTokenAndAdmin = (req, res, next) => {
  const result = authenticateToken(req, res);

  if (result.error) {
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  }

  req.user = result.user;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only." });
  }

  next();
};

const verifyTokenAndMerchant = (req, res, next) => {
  const result = authenticateToken(req, res);

  if (result.error) {
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  }

  req.user = result.user;

  if (req.user.role !== "merchant") {
    return res.status(403).json({ message: "Merchant access only." });
  }

  next();
};

const verifyTokenForAdminAndMerchant = (req, res, next) => {
  const result = authenticateToken(req, res);
  if (result.error) {
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  }
  req.user = result.user;

  // Allow access if the role is admin or merchant
  if (req.user.role !== "admin" && req.user.role !== "merchant") {
    return res.status(403).json({ message: "Admin or merchant access only." });
  }

  next(); // Proceed to next middleware if the user is either admin or merchant
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndMerchant,
  verifyTokenForAdminAndMerchant,
};
