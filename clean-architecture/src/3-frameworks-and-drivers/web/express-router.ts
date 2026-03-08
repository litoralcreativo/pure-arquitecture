import express, { Router, Request, Response } from "express";
import { RouteConfig } from "./route-config";

export function createRouter(routes: RouteConfig[]): Router {
  const router = express.Router();

  routes.forEach((route) => {
    const handler = async (req: Request, res: Response) => {
      try {
        // Adaptar Express Request a HttpRequest genérico
        const httpRequest = route.adaptRequest(req);

        // Ejecutar controller
        await route.controller.handle(httpRequest);

        // Obtener y enviar respuesta desde presenter
        const viewModel = route.presenter.getViewModel();
        res.json(viewModel);
      } catch (error) {
        // Manejo de errores no capturados
        console.error("Unhandled error in route:", error);
        res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }
    };

    // Registrar ruta según el método HTTP
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
