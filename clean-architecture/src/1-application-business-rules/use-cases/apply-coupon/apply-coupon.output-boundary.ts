/**
 * Data structure for successful apply-coupon operation.
 */
export interface ApplyCouponSuccessData {
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string;
}

/**
 * View model for apply coupon operation.
 */
export interface ApplyCouponViewModel {
  success: boolean;
  message?: string;
  subtotal?: number;
  discount?: number;
  total?: number;
  couponCode?: string;
  error?: string;
}

/**
 * Output boundary for applying coupons to cart.
 * Defines how coupon application results are presented to the user.
 */
export interface ApplyCouponOutputBoundary {
  presentSuccess(data: ApplyCouponSuccessData): void;
  presentError(message: string): void;
  getViewModel(): ApplyCouponViewModel;
}
