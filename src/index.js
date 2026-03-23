require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Import our new post router
const postRouter = require("./routes/posts.routes.js");

// 2. Mount the router (ADD THIS LINE)
// This tells Express to send any request starting with /api/v1/posts
// to the postRouter.
const mainRouter = require("./routes");
app.use("/api/v1", mainRouter);

// Database connection
connectDB();

app.get("/welcome", (req, res) => {
  res.send("Welcome to the Blogify API!");
});

// Centralized Error Handler
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for the developer
  console.error(err);

  // Mongoose Bad ObjectId -> CastError
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    return res.status(404).json({ success: false, error: { message } });
  }

  // Mongoose Duplicate Key Error -> MongoServerError
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    return res.status(400).json({ success: false, error: { message } });
  }

  // Mongoose Validation Error -> ValidationError
  if (err.name === "ValidationError") {
    // The error object contains an array of specific validation errors
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ success: false, error: { message } });
  }

  // If it's none of the above, it's an unexpected server error.
  // This is our default "catch-all".
  res.status(500).json({
    success: false,
    error: { message: "Internal Server Error" },
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
