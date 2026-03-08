import { HttpRequest } from "./http-request";

export interface Controller<TBody = unknown> {
  handle(req: HttpRequest<TBody>): Promise<void>;
}
