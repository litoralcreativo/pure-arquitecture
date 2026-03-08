export interface IncreaseQuantityOutputBoundary {
  success(): void;
  cartNotFound(): void;
  productNotFoundInCart(): void;
  error(message: string): void;
}
