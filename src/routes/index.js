const express = require("express");
const router = express.Router();

const authRouter = require("./auth.routes.js");
const postRouter = require("./posts.routes.js");
router.use("/auth", authRouter);
router.use("/posts", postRouter);

module.exports = router;
