export interface HttpRequest<T = unknown> {
  body: T;
  params?: Record<string, string>;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}
