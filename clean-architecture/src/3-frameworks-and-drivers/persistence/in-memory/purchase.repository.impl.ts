import { Purchase } from "@entities/purchase";
import { PurchaseRepository } from "@usecases/abstractions/purchase.repository";

/**
 * In-memory implementation of purchase repository.
 * Stores completed purchases in memory for development and testing purposes.
 */
export class InMemoryPurchaseRepository implements PurchaseRepository {
  private purchases: Purchase[] = [];

  /**
   * Saves a new purchase to the repository.
   * @param purchase - The purchase to save
   */
  async save(purchase: Purchase): Promise<void> {
    this.purchases.push(purchase);
  }

  /**
   * Retrieves all purchases for a customer.
   * Returns purchases sorted by date (most recent first).
   * @param customerId - The customer identifier
   * @returns Array of customer purchases
   */
  async findByCustomerId(customerId: string): Promise<Purchase[]> {
    const customerPurchases = this.purchases.filter(
      (p) => p.customerId === customerId,
    );

    // Sort by date descending (most recent first)
    return customerPurchases.sort((a, b) => {
      return b.getCreatedAt().getTime() - a.getCreatedAt().getTime();
    });
  }

  /**
   * Retrieves a purchase by ID.
   * @param purchaseId - The purchase identifier
   * @returns The purchase if found, null otherwise
   */
  async findById(purchaseId: string): Promise<Purchase | null> {
    const purchase = this.purchases.find((p) => p.id === purchaseId);
    return purchase ?? null;
  }
}
