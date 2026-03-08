import { LineItem } from "./line-item";
import { Product } from "./product";
import { Coupon } from "./coupon";

/**
 * Shopping cart entity representing a customer's current selection.
 * Manages products, quantities, and applied discounts.
 */
export class Cart {
  private _lineItems: Map<string, LineItem> = new Map();
  private _appliedCoupon: Coupon | null = null;

  constructor(public readonly customerId: string) {}

  /**
   * Adds a product to the cart.
   * If product exists, increments quantity; otherwise creates new line item.
   * @param product - The product to add
   * @param price - The current price of the product
   */
  addProduct(product: Product, price: number) {
    const lineItem = this._lineItems.get(product.id);

    if (lineItem) {
      lineItem.quantity += 1;
    } else {
      this._lineItems.set(product.id, new LineItem(product, 1, price));
    }
  }

  /**
   * Removes a product from the cart.
   * @param productId - The product identifier to remove
   * @returns true if product was removed, false if not found
   */
  removeProduct(productId: string): boolean {
    if (!this._lineItems.has(productId)) {
      return false;
    }

    this._lineItems.delete(productId);
    return true;
  }

  /**
   * Increases the quantity of a product in the cart.
   * @param productId - The product identifier
   * @returns true if quantity was increased, false if product not found
   */
  increaseQuantity(productId: string): boolean {
    const lineItem = this._lineItems.get(productId);

    if (!lineItem) {
      return false;
    }

    lineItem.quantity += 1;
    return true;
  }

  /**
   * Decreases the quantity of a product in the cart.
   * If quantity reaches zero, removes the product.
   * @param productId - The product identifier
   * @returns true if quantity was decreased, false if product not found
   */
  decreaseQuantity(productId: string): boolean {
    const lineItem = this._lineItems.get(productId);

    if (!lineItem) {
      return false;
    }

    if (lineItem.quantity > 1) {
      lineItem.quantity -= 1;
    } else {
      this._lineItems.delete(productId);
    }

    return true;
  }

  /**
   * Retrieves all line items in the cart.
   * @returns Array of line items
   */
  getProducts() {
    return Array.from(this._lineItems.values());
  }

  /**
   * Applies a discount coupon to the cart.
   * Validates coupon eligibility before applying.
   * @param coupon - The coupon to apply
   * @throws Error if coupon is inactive or minimum amount not met
   */
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

  /**
   * Removes the currently applied coupon from the cart.
   * @throws Error if no coupon is applied
   */
  removeCoupon(): void {
    if (!this._appliedCoupon) {
      throw new Error("No coupon applied to cart");
    }
    this._appliedCoupon = null;
  }

  /**
   * Calculates the subtotal before discounts.
   * @returns The sum of all line item subtotals
   */
  calculateSubtotal(): number {
    return Array.from(this._lineItems.values()).reduce((total, item) => {
      return total + item.calculateSubtotal();
    }, 0);
  }

  /**
   * Calculates the discount amount from applied coupon.
   * @returns The discount amount, or 0 if no coupon applied
   */
  calculateDiscount(): number {
    if (!this._appliedCoupon) {
      return 0;
    }

    const subtotal = this.calculateSubtotal();
    return this._appliedCoupon.calculateDiscount(subtotal);
  }

  /**
   * Calculates the final total after applying discounts.
   * @returns The total amount (never negative)
   */
  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const discount = this.calculateDiscount();
    return Math.max(0, subtotal - discount);
  }

  /** Gets the currently applied coupon */
  get appliedCoupon(): Coupon | null {
    return this._appliedCoupon;
  }

  /** Checks if the cart is empty */
  get isEmpty(): boolean {
    return this._lineItems.size === 0;
  }

  /** Gets the total number of items in the cart */
  get totalItems(): number {
    return Array.from(this._lineItems.values()).reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }
}
