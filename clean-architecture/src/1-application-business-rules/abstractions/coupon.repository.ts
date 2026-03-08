import { Coupon } from "@entities/coupon";

/**
 * Repository abstraction for coupon persistence.
 * Defines operations for retrieving discount coupons.
 * Implementations handle the actual data storage mechanism.
 */
export interface CouponRepository {
  /**
   * Retrieves a coupon by its code.
   * @param code - The coupon code to search for
   * @returns The coupon if found, null otherwise
   */
  findByCode(code: string): Promise<Coupon | null>;
}
