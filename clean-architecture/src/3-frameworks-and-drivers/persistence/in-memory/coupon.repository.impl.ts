import { Coupon, CouponType } from "@entities/coupon";
import { CouponRepository } from "@usecases/abstractions/coupon.repository";

export class InMemoryCouponRepository implements CouponRepository {
  private coupons: Map<string, Coupon> = new Map();

  constructor() {
    this.seedCoupons();
  }

  private seedCoupons(): void {
    // Cupones según BUSINESS.md
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

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = this.coupons.get(code.toUpperCase());
    return coupon || null;
  }
}
