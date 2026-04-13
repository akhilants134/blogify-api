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
const METRIC_SAMPLE_LIMIT = 200;
const metricsByEndpoint = new Map();

const getEndpointKey = (method, originalUrl) => {
  const pathWithoutQuery = originalUrl.split("?")[0] || "/";
  return `${method} ${pathWithoutQuery}`;
};

const calculateP95 = (samples) => {
  if (samples.length === 0) return 0;

  const sorted = [...samples].sort((a, b) => a - b);
  const index = Math.ceil(0.95 * sorted.length) - 1;
  return sorted[Math.max(index, 0)];
};

const recordMetric = (endpointKey, durationInMs) => {
  const existing = metricsByEndpoint.get(endpointKey) || {
    count: 0,
    totalMs: 0,
    samples: [],
  };

  existing.count += 1;
  existing.totalMs += durationInMs;
  existing.samples.push(durationInMs);

  if (existing.samples.length > METRIC_SAMPLE_LIMIT) {
    existing.samples.shift();
  }

  metricsByEndpoint.set(endpointKey, existing);
};

const printMetricsSummary = () => {
  if (metricsByEndpoint.size === 0) {
    return;
  }

  console.log("\n=== Request Metrics Summary (rolling) ===");

  for (const [endpoint, stats] of metricsByEndpoint.entries()) {
    const avgMs = stats.totalMs / stats.count;
    const p95Ms = calculateP95(stats.samples);

    console.log(
      `${endpoint} | count=${stats.count} avg=${avgMs.toFixed(2)} ms p95=${p95Ms.toFixed(2)} ms`,
    );
  }

  console.log("=== End Metrics Summary ===\n");
};

setInterval(printMetricsSummary, 30000);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  const endpointKey = getEndpointKey(req.method, req.originalUrl);

  res.on("finish", () => {
    const durationInMs = Number(process.hrtime.bigint() - start) / 1e6;

    recordMetric(endpointKey, durationInMs);

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durationInMs.toFixed(2)} ms`,
    );
  });

  next();
});

const mainRouter = require("./routes");
const authRouter = require("./routes/auth.routes.js");

app.use("/api/v1", mainRouter);
app.use("/api/user", authRouter);
app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Blogify API",
    docs: "/welcome",
    routes: {
      auth: "/api/v1/auth",
      posts: "/api/v1/posts",
    },
  });
});

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
