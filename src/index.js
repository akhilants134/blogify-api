const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/db.js");

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const mainRouter = require("./routes");
const authRouter = require("./routes/auth.routes.js");

app.use("/api/v1", mainRouter);
app.use("/api/user", authRouter);
app.use("/api/users", authRouter);

app.get("/welcome", (req, res) => {
  res.send("Welcome to the Blogify API!");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  });
