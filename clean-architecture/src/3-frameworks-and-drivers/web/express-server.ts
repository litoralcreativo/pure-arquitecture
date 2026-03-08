import express, { Express, Router } from "express";

/**
 * Creates and configures an Express server.
 * Sets up JSON body parsing and mounts the router.
 * @param router - The Express router with configured routes
 * @returns Configured Express application
 */
export function createServer(router: Router): Express {
  const app = express();

  app.use(express.json());
  app.use(router);

  return app;
}
