import express, { Router, Request, Response } from "express";
import { RouteConfig } from "./route-config";

/**
 * Creates an Express router from route configurations.
 * Maps Clean Architecture controllers/presenters to Express routes.
 * @param routes - Array of route configurations
 * @returns Configured Express router
 */
export function createRouter(routes: RouteConfig[]): Router {
  const router = express.Router();

  routes.forEach((route) => {
    const handler = async (req: Request, res: Response) => {
      try {
        // Adapt Express Request to generic HttpRequest
        const httpRequest = route.adaptRequest(req);

        // Execute controller
        await route.controller.handle(httpRequest);

        // Get and send response from presenter
        const viewModel = route.presenter.getViewModel();
        res.json(viewModel);
      } catch (error) {
        // Handle uncaught errors
        console.error("Unhandled error in route:", error);
        res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }
    };

    // Register route by HTTP method
    switch (route.method) {
      case "GET":
        router.get(route.path, handler);
        break;
      case "POST":
        router.post(route.path, handler);
        break;
      case "PUT":
        router.put(route.path, handler);
        break;
      case "PATCH":
        router.patch(route.path, handler);
        break;
      case "DELETE":
        router.delete(route.path, handler);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${route.method}`);
    }
  });

  return router;
}
