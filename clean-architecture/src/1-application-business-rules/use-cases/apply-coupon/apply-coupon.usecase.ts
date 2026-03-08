import { CartRepository } from "@usecases/abstractions/cart.repository";
import { CouponRepository } from "@usecases/abstractions/coupon.repository";
import { ApplyCouponInputBoundary } from "./apply-coupon.input-boundary";
import { ApplyCouponOutputBoundary } from "./apply-coupon.output-boundary";
import { ApplyCouponInput } from "./apply-coupon.dto";

export class ApplyCouponUseCase implements ApplyCouponInputBoundary {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly couponRepository: CouponRepository,
    private readonly presenter: ApplyCouponOutputBoundary,
  ) {}

  async execute(request: ApplyCouponInput): Promise<void> {
    try {
      // Validar datos de entrada
      if (!request.customerId || !request.couponCode) {
        this.presenter.presentError("Customer ID and coupon code are required");
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

      // Verificar que el carrito no esté vacío
      if (cart.isEmpty) {
        this.presenter.presentError("Cannot apply coupon to an empty cart");
        return;
      }

      // Buscar el cupón
      const coupon = await this.couponRepository.findByCode(
        request.couponCode.toUpperCase(),
      );

      if (!coupon) {
        this.presenter.presentError(`Coupon '${request.couponCode}' not found`);
        return;
      }

      // Verificar si ya tiene un cupón aplicado
      if (cart.appliedCoupon) {
        this.presenter.presentError(
          `Cart already has coupon '${cart.appliedCoupon.code}' applied. Remove it first.`,
        );
        return;
      }

      // Intentar aplicar el cupón (las validaciones están en la entidad)
      try {
        cart.applyCoupon(coupon);
      } catch (error) {
        this.presenter.presentError(
          error instanceof Error ? error.message : "Failed to apply coupon",
        );
        return;
      }

      // Guardar el carrito actualizado
      await this.cartRepository.save(cart);

      // Presentar el resultado exitoso
      this.presenter.presentSuccess(
        cart.calculateSubtotal(),
        cart.calculateDiscount(),
        cart.calculateTotal(),
        coupon.code,
      );
    } catch (error) {
      this.presenter.presentError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }
  }
}
