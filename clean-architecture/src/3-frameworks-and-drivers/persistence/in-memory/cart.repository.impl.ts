import { Cart } from "@entities/cart";
import { CartRepository } from "@usecases/abstractions/cart.repository";

/**
 * In-memory implementation of cart repository.
 * Stores carts in memory for development and testing purposes.
 */
export class InMemoryCartRepository implements CartRepository {
  private carts: Cart[] = [];

  /**
   * Retrieves a cart by customer ID.
   * @param customerId - The customer identifier
   * @returns The cart if found, null otherwise
   */
  async getByCustomerId(customerId: string): Promise<Cart | null> {
    const cart = this.carts.find((c) => c.customerId === customerId);
    return cart ?? null;
  }

  /**
   * Saves a cart to the repository.
   * Updates existing cart or creates new one.
   * @param cart - The cart to save
   */
  async save(cart: Cart): Promise<void> {
    const index = this.carts.findIndex((c) => c.customerId === cart.customerId);

    if (index >= 0) {
      this.carts[index] = cart;
    } else {
      this.carts.push(cart);
    }
  }
}
