import { CartRepository } from "../../abstractions/cart.repository";
import {
  IncreaseQuantityInput,
  IncreaseQuantityInputBoundary,
} from "./increase-quantity.input-boundary";
import { IncreaseQuantityOutputBoundary } from "./increase-quantity.output-boundary";

/**
 * Use case for increasing product quantity in cart.
 * Validates cart and product existence, then increments quantity.
 */
export class IncreaseQuantityUseCase implements IncreaseQuantityInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private presenter: IncreaseQuantityOutputBoundary,
  ) {}

  async execute(input: IncreaseQuantityInput): Promise<void> {
    try {
      const cart = await this.cartRepository.getByCustomerId(input.customerId);

      if (!cart) {
        this.presenter.presentError("Cart not found");
        return;
      }

      const productIncreased = cart.increaseQuantity(input.productId);

      if (!productIncreased) {
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
