export interface RemoveCouponViewModel {
  success: boolean;
  message?: string;
  subtotal?: number;
  total?: number;
  error?: string;
}

export interface RemoveCouponOutputBoundary {
  presentSuccess(subtotal: number, total: number): void;
  presentError(message: string): void;
  getViewModel(): RemoveCouponViewModel;
}
