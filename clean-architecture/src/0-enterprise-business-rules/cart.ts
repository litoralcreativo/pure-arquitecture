import { LineItem } from "./line-item";
import { Product } from "./product";
import { Coupon } from "./coupon";

export class Cart {
  private _lineItems: Map<string, LineItem> = new Map();
  private _appliedCoupon: Coupon | null = null;

  constructor(public readonly customerId: string) {}

  addProduct(product: Product, price: number) {
    const lineItem = this._lineItems.get(product.id);

    if (lineItem) {
      lineItem.quantity += 1;
    } else {
      this._lineItems.set(product.id, new LineItem(product, 1, price));
    }
  }

  removeProduct(productId: string): boolean {
    if (!this._lineItems.has(productId)) {
      return false; // Product not found in cart
    }

    this._lineItems.delete(productId);

    return true;
  }

  increaseQuantity(productId: string): boolean {
    const lineItem = this._lineItems.get(productId);

    if (!lineItem) {
      return false; // Product not found in cart
    }

    lineItem.quantity += 1;

    return true;
  }

  decreaseQuantity(productId: string): boolean {
    const lineItem = this._lineItems.get(productId);

    if (!lineItem) {
      return false; // Product not found in cart
    }

    if (lineItem.quantity > 1) {
      lineItem.quantity -= 1;
    } else {
      this._lineItems.delete(productId);
    }

    return true;
  }

  getProducts() {
    return Array.from(this._lineItems.values());
  }

  applyCoupon(coupon: Coupon): void {
    const subtotal = this.calculateSubtotal();

    if (!coupon.canBeAppliedTo(subtotal)) {
      if (!coupon.isActive) {
        throw new Error("Coupon is not active");
      }
      throw new Error(
        `Minimum purchase amount of $${coupon.minimumPurchaseAmount} is required`,
      );
    }

    this._appliedCoupon = coupon;
  }

  removeCoupon(): void {
    if (!this._appliedCoupon) {
      throw new Error("No coupon applied to cart");
    }
    this._appliedCoupon = null;
  }

  calculateSubtotal(): number {
    return Array.from(this._lineItems.values()).reduce((total, item) => {
      return total + item.calculateSubtotal();
    }, 0);
  }

  calculateDiscount(): number {
    if (!this._appliedCoupon) {
      return 0;
    }

    const subtotal = this.calculateSubtotal();
    return this._appliedCoupon.calculateDiscount(subtotal);
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const discount = this.calculateDiscount();
    return Math.max(0, subtotal - discount);
  }

  get appliedCoupon(): Coupon | null {
    return this._appliedCoupon;
  }

  get isEmpty(): boolean {
    return this._lineItems.size === 0;
  }

  get totalItems(): number {
    return Array.from(this._lineItems.values()).reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }
}
