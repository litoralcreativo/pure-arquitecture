export interface ApplyCouponViewModel {
  success: boolean;
  message?: string;
  subtotal?: number;
  discount?: number;
  total?: number;
  couponCode?: string;
  error?: string;
}

export interface ApplyCouponOutputBoundary {
  presentSuccess(
    subtotal: number,
    discount: number,
    total: number,
    couponCode: string,
  ): void;
  presentError(message: string): void;
  getViewModel(): ApplyCouponViewModel;
}
