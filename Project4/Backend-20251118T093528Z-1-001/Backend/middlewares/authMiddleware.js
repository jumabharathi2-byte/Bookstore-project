const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, unauthorized" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Assuming JWT payload has { id, name }
    req.user = { id: verified.id, name: verified.name }; 
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
