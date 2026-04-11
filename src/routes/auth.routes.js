const express = require("express");

const authController = require("../controllers/auth.controller.js");
const protect = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/", protect, authController.getAllUsers);
router.delete("/:id", protect, authController.deleteUser);

module.exports = router;
