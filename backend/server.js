import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";

import env, { allowedOrigins, isProduction } from "./config/env.js";
import connectDB, { disconnectDB } from "./config/db.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";

import {
  submissionPublicRoutes,
  submissionAdminRoutes,
} from "./routes/submissionRoutes.js";

import {
  inquiryPublicRoutes,
  inquiryAdminRoutes,
} from "./routes/inquiryRoutes.js";

import {
  settingsPublicRoutes,
  settingsAdminRoutes,
} from "./routes/settingsRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.set("trust proxy", 1);

// ---------------------------------------------------------------------------
// Security & core middleware
// ---------------------------------------------------------------------------

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/server-to-server requests with no Origin header
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS: origin ${origin} is not allowed.`)
      );
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "2mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);

app.use(cookieParser());

app.use(mongoSanitize());

if (!isProduction) {
  app.use(morgan("dev"));
}

// API rate limiter
app.use("/api", generalLimiter);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Entomology Science Backend API is running.",
    health: "/api/health",
  });
});

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

// Authentication
app.use("/api/auth", authRoutes);

// Public routes
app.use("/api", submissionPublicRoutes);
app.use("/api", inquiryPublicRoutes);
app.use("/api", settingsPublicRoutes);

// Admin routes
app.use("/api/admin", submissionAdminRoutes);
app.use("/api/admin", inquiryAdminRoutes);
app.use("/api/admin", settingsAdminRoutes);
app.use("/api/admin", dashboardRoutes);

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

app.use(notFound);

app.use(errorHandler);

// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------

async function start() {
  try {
    await connectDB();

    const server = app.listen(env.PORT, "0.0.0.0", () => {
      console.log(
        `[server] Entomology Science API running on port ${env.PORT} (${env.NODE_ENV})`
      );

      console.log(
        `[server] Allowed client origins: ${allowedOrigins.join(", ")}`
      );
    });

    const shutdown = async (signal) => {
      console.log(
        `\n[server] Received ${signal}. Shutting down gracefully...`
      );

      server.close(async () => {
        await disconnectDB();

        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));

    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("[server] Failed to start server:", error);

    process.exit(1);
  }
}

start();

export default app;