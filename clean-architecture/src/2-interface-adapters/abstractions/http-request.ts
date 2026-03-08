/**
 * HTTP request abstraction representing incoming web requests.
 * Encapsulates request data in a framework-agnostic way.
 *
 * @template T - The expected type of the request body
 */
export interface HttpRequest<T = unknown> {
  /** Request body payload */
  body: T;

  /** URL path parameters (e.g., /users/:id) */
  params?: Record<string, string>;

  /** Query string parameters (e.g., ?page=1&limit=10) */
  query?: Record<string, string>;

  /** HTTP headers */
  headers?: Record<string, string>;
}
