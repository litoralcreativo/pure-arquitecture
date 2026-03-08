import { RemoveProductFromCartInputBoundary } from "./remove-product-from-cart.input-boundary";
import { RemoveProductFromCartInput } from "./remove-product-from-cart.dto";
import { CartRepository } from "@usecases/abstractions/cart.repository";
import { RemoveProductFromCartOutputBoundary } from "./remove-product-from-cart.output-boundary";

export class RemoveProductFromCartUseCase implements RemoveProductFromCartInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private presenter: RemoveProductFromCartOutputBoundary,
  ) {}

  async execute(input: RemoveProductFromCartInput): Promise<void> {
    try {
      const cart = await this.cartRepository.getByCustomerId(input.customerId);

      if (!cart) {
        this.presenter.presentError(
          "Cart not found. Please create a cart first",
        );
        return;
      }

      const removed = cart.removeProduct(input.productId);

      if (!removed) {
        this.presenter.presentError("Product not found in cart");
        return;
      }

      await this.cartRepository.save(cart);

      this.presenter.presentSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      this.presenter.presentError(errorMessage);
    }
  }
}
