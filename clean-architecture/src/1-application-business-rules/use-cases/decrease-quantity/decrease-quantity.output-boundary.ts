export interface DecreaseQuantityOutputBoundary {
  success(): void;
  cartNotFound(): void;
  productNotFoundInCart(): void;
  error(message: string): void;
}
