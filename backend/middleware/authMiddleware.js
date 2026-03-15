/**
 * HACKATHON DEMO MIDDLEWARE
 * Bypassing all authentication for seamless presentation.
 */
const authMiddleware = (req, res, next) => {
  // Attach a dummy user object for routes that expect it
  req.user = {
    id: "demo_user_id",
    role: req.headers['role'] || "Strategic Owner",
    name: "Demo User"
  };
  
  next(); // Proceed without verification
};

module.exports = authMiddleware;