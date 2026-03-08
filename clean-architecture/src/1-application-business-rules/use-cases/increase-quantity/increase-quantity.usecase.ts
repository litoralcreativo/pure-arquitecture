import { CartRepository } from "../../abstractions/cart.repository";
import { IncreaseQuantityDTO } from "./increase-quantity.dto";
import { IncreaseQuantityInputBoundary } from "./increase-quantity.input-boundary";
import { IncreaseQuantityOutputBoundary } from "./increase-quantity.output-boundary";

export class IncreaseQuantityUseCase implements IncreaseQuantityInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private presenter: IncreaseQuantityOutputBoundary,
  ) {}

  async execute(dto: IncreaseQuantityDTO): Promise<void> {
    try {
      const cart = await this.cartRepository.getByCustomerId(dto.customerId);

      if (!cart) {
        this.presenter.cartNotFound();
        return;
      }

      const productIncreased = cart.increaseQuantity(dto.productId);

      if (!productIncreased) {
        this.presenter.productNotFoundInCart();
        return;
      }

      await this.cartRepository.save(cart);
      this.presenter.success();
    } catch (error) {
      this.presenter.error(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }
}
