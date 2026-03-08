/**
 * Input data for applying a coupon to cart.
 */
export interface ApplyCouponInput {
  customerId: string;
  couponCode: string;
}

/**
 * Input boundary for applying a coupon to cart.
 * Defines the contract for coupon application use case.
 */
export interface ApplyCouponInputBoundary {
  execute(input: ApplyCouponInput): Promise<void>;
}
