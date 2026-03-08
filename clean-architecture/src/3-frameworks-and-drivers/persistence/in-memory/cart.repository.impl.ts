import { Cart } from "@entities/cart";
import { CartRepository } from "@usecases/abstractions/cart.repository";

export class InMemoryCartRepository implements CartRepository {
  private carts: Cart[] = [];

  async getByCustomerId(customerId: string): Promise<Cart | null> {
    const cart = this.carts.find((c) => c.customerId === customerId);
    return cart ?? null;
  }

  async save(cart: Cart): Promise<void> {
    const index = this.carts.findIndex((c) => c.customerId === cart.customerId);

    if (index >= 0) {
      this.carts[index] = cart;
    } else {
      this.carts.push(cart);
    }
  }
}
