/**
 * Input data for removing a coupon from cart.
 */
export interface RemoveCouponInput {
  customerId: string;
}

/**
 * Input boundary for removing a coupon from cart.
 * Defines the contract for remove coupon use case.
 */
export interface RemoveCouponInputBoundary {
  execute(input: RemoveCouponInput): Promise<void>;
}
