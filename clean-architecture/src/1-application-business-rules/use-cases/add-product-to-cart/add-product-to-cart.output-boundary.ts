/**
 * View model for add product to cart operation.
 */
export interface AddProductToCartViewModel {
  success: boolean;
  error?: string;
}

/**
 * Output boundary for adding products to cart.
 * Defines how operation results are presented to the user.
 */
export interface AddProductToCartOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): AddProductToCartViewModel;
}
