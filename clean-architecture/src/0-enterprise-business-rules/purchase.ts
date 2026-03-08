import { PurchaseItem } from "./purchase-item";
import { PurchaseStatus } from "./purchase-status";

/**
 * Purchase entity representing a completed transaction.
 * Immutable snapshot of the cart at checkout time.
 *
 * Business Rules:
 * - RN-12: Purchase is immutable (cannot be modified after creation)
 * - RN-13: Captures price snapshot at checkout moment
 * - RN-16: Each purchase has a unique ID
 *
 * This entity represents the permanent historical record of a transaction.
 */
export class Purchase {
  private readonly createdAt: Date;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    private readonly items: PurchaseItem[],
    public readonly subtotal: number,
    public readonly discount: number,
    public readonly total: number,
    public readonly couponCode: string | null,
    public readonly status: PurchaseStatus,
  ) {
    if (items.length === 0) {
      throw new Error("Purchase must have at least one item");
    }
    if (subtotal < 0) {
      throw new Error("Purchase subtotal cannot be negative");
    }
    if (discount < 0) {
      throw new Error("Purchase discount cannot be negative");
    }
    if (total < 0) {
      throw new Error("Purchase total cannot be negative");
    }

    this.createdAt = new Date();
  }

  /**
   * Retrieves the list of purchase items (immutable).
   * @returns Read-only array of items
   */
  public getItems(): readonly PurchaseItem[] {
    return [...this.items];
  }

  /**
   * Retrieves the purchase creation timestamp.
   * @returns Copy of creation date
   */
  public getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  /**
   * Calculates the total number of units purchased.
   * @returns Sum of all item quantities
   */
  public getTotalUnits(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Checks if the purchase is completed.
   * @returns true if status is COMPLETED
   */
  public isCompleted(): boolean {
    return this.status === PurchaseStatus.COMPLETED;
  }

  /**
   * Serializes the purchase for storage or transmission.
   * @returns Plain object representation
   */
  public toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      items: this.items.map((item) => item.toJSON()),
      subtotal: this.subtotal,
      discount: this.discount,
      total: this.total,
      couponCode: this.couponCode,
      status: this.status,
      totalUnits: this.getTotalUnits(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
