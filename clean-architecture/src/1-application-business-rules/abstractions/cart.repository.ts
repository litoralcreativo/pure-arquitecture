import { Cart } from "@entities/cart";

export interface CartRepository {
  getByCustomerId(customerId: string): Promise<Cart | null>;
  save(cart: Cart): Promise<void>;
}
