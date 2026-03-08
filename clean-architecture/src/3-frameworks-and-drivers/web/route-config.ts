import { Request } from "express";
import { Controller } from "@interface-adapters/abstractions/controller";
import { Presenter } from "@interface-adapters/abstractions/presenter";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RouteConfig<TBody = unknown, TViewModel = unknown> {
  method: HttpMethod;
  path: string;
  controller: Controller<TBody>;
  presenter: Presenter<TViewModel>;
  adaptRequest: (req: Request) => HttpRequest<TBody>;
}

export class RouteBuilder {
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

  static post<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("POST", path, controller, presenter, adaptRequest);
  }

  static get<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("GET", path, controller, presenter, adaptRequest);
  }

  static put<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("PUT", path, controller, presenter, adaptRequest);
  }

  static patch<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("PATCH", path, controller, presenter, adaptRequest);
  }

  static delete<TBody = unknown, TViewModel = unknown>(
    path: string,
    controller: Controller<TBody>,
    presenter: Presenter<TViewModel>,
    adaptRequest: (req: Request) => HttpRequest<TBody>,
  ): RouteConfig<TBody, TViewModel> {
    return this.create("DELETE", path, controller, presenter, adaptRequest);
  }
}
