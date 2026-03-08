export interface CreateCartViewModel {
  success: boolean;
  cartId?: string;
  error?: string;
}

export interface CreateCartOutputBoundary {
  presentSuccess(cartId: string): void;
  presentError(message: string): void;
  getViewModel(): CreateCartViewModel;
}
