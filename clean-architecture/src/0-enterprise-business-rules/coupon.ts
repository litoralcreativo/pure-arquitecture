/**
 * Types of discount coupons available.
 */
export enum CouponType {
  /** Percentage-based discount (e.g., 10% off) */
  PERCENTAGE = "PERCENTAGE",
  /** Fixed amount discount (e.g., $5 off) */
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

/**
 * Properties required to create a coupon.
 */
export interface CouponProps {
  code: string;
  type: CouponType;
  value: number;
  minimumPurchaseAmount: number;
  isActive: boolean;
}

/**
 * Coupon entity representing a discount code.
 * Encapsulates discount calculation logic and validation rules.
 *
 * Business Rules:
 * - Percentage coupons cannot exceed 100%
 * - Fixed amount discounts cannot exceed subtotal
 * - Coupons require minimum purchase amount to be valid
 */
export class Coupon {
  private readonly _code: string;
  private readonly _type: CouponType;
  private readonly _value: number;
  private readonly _minimumPurchaseAmount: number;
  private readonly _isActive: boolean;

  constructor(props: CouponProps) {
    this.validateCoupon(props);

    this._code = props.code;
    this._type = props.type;
    this._value = props.value;
    this._minimumPurchaseAmount = props.minimumPurchaseAmount;
    this._isActive = props.isActive;
  }

  /**
   * Validates coupon properties.
   * @throws Error if validation fails
   */
  private validateCoupon(props: CouponProps): void {
    if (!props.code || props.code.trim().length === 0) {
      throw new Error("Coupon code cannot be empty");
    }

    if (props.value <= 0) {
      throw new Error("Coupon value must be greater than zero");
    }

    if (props.type === CouponType.PERCENTAGE && props.value > 100) {
      throw new Error("Percentage coupon value cannot exceed 100");
    }

    if (props.minimumPurchaseAmount < 0) {
      throw new Error("Minimum purchase amount cannot be negative");
    }
  }

  /** Gets the coupon code */
  get code(): string {
    return this._code;
  }

  /** Gets the coupon type */
  get type(): CouponType {
    return this._type;
  }

  /** Gets the coupon value (percentage or fixed amount) */
  get value(): number {
    return this._value;
  }

  /** Gets the minimum purchase amount required */
  get minimumPurchaseAmount(): number {
    return this._minimumPurchaseAmount;
  }

  /** Checks if the coupon is active */
  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * Calculates the discount amount for a given subtotal.
   * @param subtotal - The cart subtotal
   * @returns The discount amount (0 if coupon cannot be applied)
   */
  calculateDiscount(subtotal: number): number {
    if (!this._isActive) {
      return 0;
    }

    if (subtotal < this._minimumPurchaseAmount) {
      return 0;
    }

    if (this._type === CouponType.PERCENTAGE) {
      return subtotal * (this._value / 100);
    }

    // FIXED_AMOUNT: discount cannot exceed subtotal
    return Math.min(this._value, subtotal);
  }

  /**
   * Checks if the coupon can be applied to a given subtotal.
   * @param subtotal - The cart subtotal
   * @returns true if coupon is valid for the subtotal
   */
  canBeAppliedTo(subtotal: number): boolean {
    return this._isActive && subtotal >= this._minimumPurchaseAmount;
  }
}
