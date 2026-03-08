import { Request } from "express";
import { Controller } from "@interface-adapters/abstractions/controller";
import { Presenter } from "@interface-adapters/abstractions/presenter";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";

/**
 * Supported HTTP methods for routes.
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Configuration for a single route.
 * Connects Express routes to Clean Architecture controllers and presenters.
 * @template TBody - Type of the request body
 * @template TViewModel - Type of the presenter view model
 */
export interface RouteConfig<TBody = unknown, TViewModel = unknown> {
  /** HTTP method for the route */
  method: HttpMethod;
  /** URL path pattern */
  path: string;
  /** Controller to handle the request */
  controller: Controller<TBody>;
  /** Presenter to format the response */
  presenter: Presenter<TViewModel>;
  /** Function to adapt Express request to generic HttpRequest */
  adaptRequest: (req: Request) => HttpRequest<TBody>;
}

/**
 * Builder for creating route configurations with type safety.
 * Provides convenience methods for each HTTP method.
 */
export class RouteBuilder {
  /**
   * Creates a generic route configuration.
   * @param method - HTTP method
   * @param path - URL path pattern
   * @param controller - Request handler
   * @param presenter - Response formatter
   * @param adaptRequest - Request adapter function
   * @returns Route configuration
   */
  static create<TBody = unknown, TViewModel = unknown>(
    method: HttpMethod,
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return {
      method,
      path,
      controller,
      presenter,
      adaptRequest,
    };
  }

  /**
   * Creates a POST route configuration.
   */
  static post<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("POST", path, controller, presenter, adaptRequest);
  }

  /**
   * Creates a GET route configuration.
   */
  static get<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("GET", path, controller, presenter, adaptRequest);
  }

  /**
   * Creates a PUT route configuration.
   */
  static put<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("PUT", path, controller, presenter, adaptRequest);
  }

  /**
   * Creates a PATCH route configuration.
   */
  static patch<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("PATCH", path, controller, presenter, adaptRequest);
  }

  /**
   * Creates a DELETE route configuration.
   */
  static delete<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("DELETE", path, controller, presenter, adaptRequest);
  }
}
