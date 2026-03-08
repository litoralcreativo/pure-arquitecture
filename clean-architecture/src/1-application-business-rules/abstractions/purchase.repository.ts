import { Purchase } from "../../0-enterprise-business-rules/purchase";

/**
 * Repository abstraction for purchase persistence.
 * Defines operations for storing and retrieving purchase records.
 * Implementations handle the actual data storage mechanism.
 */
export interface PurchaseRepository {
  /**
   * Persists a purchase to storage.
   * @param purchase - The purchase entity to save
   */
  save(purchase: Purchase): Promise<void>;

  /**
   * Retrieves all purchases for a specific customer.
   * @param customerId - The customer's unique identifier
   * @returns Array of purchases (sorted by date descending)
   */
  findByCustomerId(customerId: string): Promise<Purchase[]>;

  /**
   * Retrieves a specific purchase by its ID.
   * @param purchaseId - The purchase's unique identifier
   * @returns The purchase if found, null otherwise
   */
  findById(purchaseId: string): Promise<Purchase | null>;
}
