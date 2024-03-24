const express = require("express");
const {
  post_login,
  get_home,
  post_logout,
} = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => res.render("login"));
router.post("/login", post_login);
router.post("/logout", post_logout);
router.get("/home", (req, res) => get_home(req, res));

module.exports = router;
