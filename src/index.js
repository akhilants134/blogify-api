// src/index.js

const express = require("express");
const app = express();
const PORT = 3000;

// 1. Import our new post router
const postRouter = require("./routes/posts.routes.js");

// 2. Mount the router (ADD THIS LINE)
// This tells Express to send any request starting with /api/v1/posts
// to the postRouter.
app.use("/api/v1/posts", postRouter);

app.get("/welcome", (req, res) => {
  res.send("Welcome to the Blogify API!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
