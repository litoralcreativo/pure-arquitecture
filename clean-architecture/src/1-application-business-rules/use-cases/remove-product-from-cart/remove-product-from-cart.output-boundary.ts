/**
 * View model for remove product from cart operation.
 */
export interface RemoveProductFromCartViewModel {
  success: boolean;
  error?: string;
}

/**
 * Output boundary for removing products from cart.
 * Defines how operation results are presented to the user.
 */
export interface RemoveProductFromCartOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): RemoveProductFromCartViewModel;
}
