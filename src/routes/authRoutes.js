const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  register,
  login,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;



router.get("/me-test", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    user: req.user,
  });
});