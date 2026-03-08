/**
 * Purchase item entity representing a product line in a completed purchase.
 * Immutable snapshot of what the customer purchased.
 *
 * Business Rules:
 * - Quantity must be greater than 0
 * - Unit price cannot be negative
 * - Subtotal = quantity × unit price
 */
export class PurchaseItem {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {
    if (quantity <= 0) {
      throw new Error("Purchase item quantity must be greater than 0");
    }
    if (unitPrice < 0) {
      throw new Error("Purchase item price cannot be negative");
    }
  }

  /**
   * Calculates the subtotal for this item.
   * @returns quantity × unit price
   */
  public getSubtotal(): number {
    return this.quantity * this.unitPrice;
  }

  /**
   * Serializes the item for storage or transmission.
   * @returns Plain object representation
   */
  public toJSON() {
    return {
      productId: this.productId,
      productName: this.productName,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      subtotal: this.getSubtotal(),
    };
  }
}
