import { Cart } from "@entities/cart";

/**
 * Repository abstraction for cart persistence.
 * Defines operations for storing and retrieving shopping carts.
 * Implementations handle the actual data storage mechanism.
 */
export interface CartRepository {
  /**
   * Retrieves a cart by customer ID.
   * @param customerId - The customer's unique identifier
   * @returns The cart if found, null otherwise
   */
  getByCustomerId(customerId: string): Promise<Cart | null>;

  /**
   * Persists a cart to storage.
   * @param cart - The cart entity to save
   */
  save(cart: Cart): Promise<void>;
}
