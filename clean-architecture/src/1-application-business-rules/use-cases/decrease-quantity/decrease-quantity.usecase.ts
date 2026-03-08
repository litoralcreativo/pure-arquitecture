import { CartRepository } from "../../abstractions/cart.repository";
import { DecreaseQuantityDTO } from "./decrease-quantity.dto";
import { DecreaseQuantityInputBoundary } from "./decrease-quantity.input-boundary";
import { DecreaseQuantityOutputBoundary } from "./decrease-quantity.output-boundary";

export class DecreaseQuantityUseCase implements DecreaseQuantityInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private presenter: DecreaseQuantityOutputBoundary,
  ) {}

  async execute(dto: DecreaseQuantityDTO): Promise<void> {
    try {
      const cart = await this.cartRepository.getByCustomerId(dto.customerId);

      if (!cart) {
        this.presenter.cartNotFound();
        return;
      }

      const productDecreased = cart.decreaseQuantity(dto.productId);

      if (!productDecreased) {
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
