/**
 * Server Entry Point
 * 
 * @module server/index
 * @description Main entry point for the Express server that powers the Tweet Like Kanye application.
 * This module sets up middleware, integrates the API routes, and configures Vite for development.
 * It also handles error responses and API request logging.
 * 
 * @requires express
 * @requires ./routes
 * @requires ./vite
 */

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Initialize Express application
const app = express();

// Configure middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * API Request Logging Middleware
 * 
 * Captures request details and response data for API endpoints.
 * Measures request duration and logs the result with truncation for long responses.
 * Only logs requests to paths starting with "/api".
 */
app.use((req, res, next) => {
  // Mark the start time for duration calculation
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Override the res.json method to capture the response body
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Log completed requests when the response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Truncate long log lines for readability
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

/**
 * Server initialization and configuration
 * Sets up the API routes, error handling, frontend serving, and starts the server
 */
(async () => {
  // Register API routes and get the HTTP server instance
  const server = registerRoutes(app);

  /**
   * Global error handling middleware
   * Catches any errors that weren't handled in the route handlers
   * Returns standardized error responses with appropriate status codes
   */
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Extract status code and message from the error, or use defaults
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Send error response to client
    res.status(status).json({ message });
    throw err; // Re-throw for logging purposes
  });

  /**
   * Frontend serving configuration
   * In development mode, sets up Vite's dev server with HMR
   * In production, serves static assets from the build directory
   * 
   * Note: It's important to set up Vite after all other routes to prevent
   * the catch-all route from interfering with API endpoints
   */
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  /**
   * Start the server
   * Binds to all network interfaces (0.0.0.0) for compatibility with hosting environments
   * Uses port 5000 to serve both the API and frontend from the same origin
   */
  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
