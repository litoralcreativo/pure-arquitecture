/**
 * Data structure for successful create-cart operation.
 */
export interface CreateCartSuccessData {
  cartId: string;
}

/**
 * View model for create cart operation.
 */
export interface CreateCartViewModel {
  success: boolean;
  cartId?: string;
  error?: string;
}

/**
 * Output boundary for cart creation.
 * Defines how cart creation results are presented to the user.
 */
export interface CreateCartOutputBoundary {
  presentSuccess(data: CreateCartSuccessData): void;
  presentError(message: string): void;
  getViewModel(): CreateCartViewModel;
}
