import { Coupon, CouponType } from "@entities/coupon";
import { CouponRepository } from "@usecases/abstractions/coupon.repository";

/**
 * In-memory implementation of coupon repository.
 * Pre-loads sample coupons for development and testing purposes.
 */
export class InMemoryCouponRepository implements CouponRepository {
  private coupons: Map<string, Coupon> = new Map();

  constructor() {
    this.seedCoupons();
  }

  /**
   * Seeds the repository with sample coupons based on business requirements.
   */
  private seedCoupons(): void {
    // Coupons as defined in BUSINESS.md
    const coupons = [
      new Coupon({
        code: "DESCUENTO10",
        type: CouponType.PERCENTAGE,
        value: 10,
        minimumPurchaseAmount: 0,
        isActive: true,
      }),
      new Coupon({
        code: "DESCUENTO20",
        type: CouponType.PERCENTAGE,
        value: 20,
        minimumPurchaseAmount: 500,
        isActive: true,
      }),
      new Coupon({
        code: "VERANO50",
        type: CouponType.FIXED_AMOUNT,
        value: 50,
        minimumPurchaseAmount: 200,
        isActive: true,
      }),
      new Coupon({
        code: "PRIMERACOMPRA",
        type: CouponType.FIXED_AMOUNT,
        value: 100,
        minimumPurchaseAmount: 300,
        isActive: true,
      }),
      new Coupon({
        code: "VERANO98",
        type: CouponType.PERCENTAGE,
        value: 15,
        minimumPurchaseAmount: 0,
        isActive: false,
      }),
    ];

    coupons.forEach((coupon) => {
      this.coupons.set(coupon.code, coupon);
    });
  }

  /**
   * Finds a coupon by its code (case-insensitive).
   * @param code - The coupon code to search for
   * @returns The coupon if found, null otherwise
   */
  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = this.coupons.get(code.toUpperCase());
    return coupon || null;
  }
}
