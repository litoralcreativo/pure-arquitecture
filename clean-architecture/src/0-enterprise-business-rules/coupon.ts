export enum CouponType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

export interface CouponProps {
  code: string;
  type: CouponType;
  value: number;
  minimumPurchaseAmount: number;
  isActive: boolean;
}

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

  get code(): string {
    return this._code;
  }

  get type(): CouponType {
    return this._type;
  }

  get value(): number {
    return this._value;
  }

  get minimumPurchaseAmount(): number {
    return this._minimumPurchaseAmount;
  }

  get isActive(): boolean {
    return this._isActive;
  }

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

    // FIXED_AMOUNT: el descuento no puede ser mayor al subtotal
    return Math.min(this._value, subtotal);
  }

  canBeAppliedTo(subtotal: number): boolean {
    return this._isActive && subtotal >= this._minimumPurchaseAmount;
  }
}
