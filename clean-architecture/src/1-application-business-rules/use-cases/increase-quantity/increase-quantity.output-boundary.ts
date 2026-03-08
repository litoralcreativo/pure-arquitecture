/**
 * View model for increase quantity operation.
 */
export interface IncreaseQuantityViewModel {
  success: boolean;
  error?: string;
}

/**
 * Output boundary for increasing product quantity in cart.
 * Defines how operation results are presented to the user.
 */
export interface IncreaseQuantityOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): IncreaseQuantityViewModel;
}
