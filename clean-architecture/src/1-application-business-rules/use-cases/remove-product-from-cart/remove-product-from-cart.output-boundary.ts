export interface RemoveProductFromCartViewModel {
  success: boolean;
  error?: string;
}

export interface RemoveProductFromCartOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): RemoveProductFromCartViewModel;
}
