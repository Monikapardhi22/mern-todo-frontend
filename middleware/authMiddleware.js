const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, "monika_secret_key"); // या process.env.JWT_SECRET
    req.user = decoded; // ✅ इससे req.user.id उपलब्ध होगा
    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = auth;
