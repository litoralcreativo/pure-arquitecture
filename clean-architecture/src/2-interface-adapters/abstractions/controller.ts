import { HttpRequest } from "./http-request";

/**
 * Controller abstraction for handling HTTP requests.
 * Controllers receive requests, delegate to use cases, and return responses.
 *
 * @template TBody - The expected type of the request body
 */
export interface Controller<TBody = unknown> {
  /**
   * Handles an incoming HTTP request.
   * @param req - The HTTP request containing body, params, query, and headers
   */
  handle(req: HttpRequest<TBody>): Promise<void>;
}
