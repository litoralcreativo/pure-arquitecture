import { CartRepository } from "@usecases/abstractions/cart.repository";
import { RemoveCouponInputBoundary } from "./remove-coupon.input-boundary";
import { RemoveCouponOutputBoundary } from "./remove-coupon.output-boundary";
import { RemoveCouponInput } from "./remove-coupon.dto";

export class RemoveCouponUseCase implements RemoveCouponInputBoundary {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly presenter: RemoveCouponOutputBoundary,
  ) {}

  async execute(request: RemoveCouponInput): Promise<void> {
    try {
      // Validar datos de entrada
      if (!request.customerId) {
        this.presenter.presentError("Customer ID is required");
        return;
      }

      // Buscar el carrito del cliente
      const cart = await this.cartRepository.getByCustomerId(
        request.customerId,
      );

      if (!cart) {
        this.presenter.presentError(
          `Cart not found for customer ${request.customerId}`,
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
      this.presenter.presentSuccess(
        cart.calculateSubtotal(),
        cart.calculateTotal(),
      );
    } catch (error) {
      this.presenter.presentError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }
  }
}
