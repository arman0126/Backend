const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token, Unauthorized access",
    });
  }
  req.user = decoded; // Attach the decoded user information to the request object
  next(); // Call the next middleware function
}

module.exports = identifyUser;
