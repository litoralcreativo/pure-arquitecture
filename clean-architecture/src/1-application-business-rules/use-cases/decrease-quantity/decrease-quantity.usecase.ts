import { CartRepository } from "../../abstractions/cart.repository";
import {
  DecreaseQuantityInput,
  DecreaseQuantityInputBoundary,
} from "./decrease-quantity.input-boundary";
import { DecreaseQuantityOutputBoundary } from "./decrease-quantity.output-boundary";

/**
 * Use case for decreasing product quantity in cart.
 * Validates cart and product existence, then decrements quantity.
 */
export class DecreaseQuantityUseCase implements DecreaseQuantityInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private presenter: DecreaseQuantityOutputBoundary,
  ) {}

  async execute(input: DecreaseQuantityInput): Promise<void> {
    try {
      const cart = await this.cartRepository.getByCustomerId(input.customerId);

      if (!cart) {
        this.presenter.presentError("Cart not found");
        return;
      }

      const productDecreased = cart.decreaseQuantity(input.productId);

      if (!productDecreased) {
        this.presenter.presentError("Product not found in cart");
        return;
      }

      await this.cartRepository.save(cart);
      this.presenter.presentSuccess();
    } catch (error) {
      this.presenter.presentError(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }
}
