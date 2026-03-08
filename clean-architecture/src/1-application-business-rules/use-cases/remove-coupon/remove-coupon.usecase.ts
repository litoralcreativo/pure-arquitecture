import { CartRepository } from "@usecases/abstractions/cart.repository";
import {
  RemoveCouponInputBoundary,
  RemoveCouponInput,
} from "./remove-coupon.input-boundary";
import { RemoveCouponOutputBoundary } from "./remove-coupon.output-boundary";

/**
 * Use case for removing coupon from cart.
 * Validates cart existence and removes applied discount.
 */
export class RemoveCouponUseCase implements RemoveCouponInputBoundary {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly presenter: RemoveCouponOutputBoundary,
  ) {}

  async execute(input: RemoveCouponInput): Promise<void> {
    try {
      // Validar datos de entrada
      if (!input.customerId) {
        this.presenter.presentError("Customer ID is required");
        return;
      }

      // Buscar el carrito del cliente
      const cart = await this.cartRepository.getByCustomerId(input.customerId);

      if (!cart) {
        this.presenter.presentError(
          `Cart not found for customer ${input.customerId}`,
        );
        return;
      }

      // Intentar remover el cupón (la validación está en la entidad)
      try {
        cart.removeCoupon();
      } catch (error) {
        this.presenter.presentError(
          error instanceof Error ? error.message : "Failed to remove coupon",
        );
        return;
      }

      // Guardar el carrito actualizado
      await this.cartRepository.save(cart);

      // Presentar el resultado exitoso
      this.presenter.presentSuccess();
    } catch (error) {
      this.presenter.presentError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }
  }
}
