/**
 * View model for the remove coupon use case response.
 */
export interface RemoveCouponViewModel {
  success: boolean;
  error?: string;
}

/**
 * Output boundary for removing a coupon from the cart.
 */
export interface RemoveCouponOutputBoundary {
  presentSuccess(): void;
  presentError(message: string): void;
  getViewModel(): RemoveCouponViewModel;
}
