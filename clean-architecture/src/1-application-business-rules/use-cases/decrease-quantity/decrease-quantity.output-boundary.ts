/**
 * View model for decrease quantity operation.
 */
export interface DecreaseQuantityViewModel {
  success: boolean;
  error?: string;
}

/**
 * Output boundary for decreasing product quantity in cart.
 * Defines how operation results are presented to the user.
 */
export interface DecreaseQuantityOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): DecreaseQuantityViewModel;
}
