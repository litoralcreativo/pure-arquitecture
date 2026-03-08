export interface AddProductToCartViewModel {
  success: boolean;
  error?: string;
}

export interface AddProductToCartOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): AddProductToCartViewModel;
}
