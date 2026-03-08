import express, { Express, Router } from "express";

export function createServer(router: Router): Express {
  const app = express();

  app.use(express.json());
  app.use(router);

  return app;
}
