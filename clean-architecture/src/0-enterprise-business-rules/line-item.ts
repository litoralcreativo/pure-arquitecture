import { Product } from "./product";

/**
 * Line item entity representing a product in a cart.
 * Combines product information with quantity and price snapshot.
 */
export class LineItem {
  constructor(
    public readonly product: Product,
    public quantity: number,
    public readonly price: number,
  ) {}

  /**
   * Calculates the subtotal for this line item.
   * @returns quantity × price
   */
  calculateSubtotal(): number {
    return this.quantity * this.price;
  }
}
