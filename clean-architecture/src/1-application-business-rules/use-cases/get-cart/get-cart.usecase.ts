import { GetCartInputBoundary } from "./get-cart.input-boundary";
import { GetCartInput } from "./get-cart.dto";
import { CartRepository } from "@usecases/abstractions/cart.repository";
import {
  GetCartOutputBoundary,
  CartItemViewModel,
} from "./get-cart.output-boundary";

export class GetCartUseCase implements GetCartInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private presenter: GetCartOutputBoundary,
  ) {}

  async execute(input: GetCartInput): Promise<void> {
    try {
      // Buscar el cart
      const cart = await this.cartRepository.getByCustomerId(input.customerId);

      if (!cart) {
        this.presenter.presentError("Cart not found");
        return;
      }

      // Obtener productos del carrito
      const lineItems = cart.getProducts();

      // Transformar a ViewModels
      const items: CartItemViewModel[] = lineItems.map((lineItem) => ({
        productId: lineItem.product.id,
        productName: lineItem.product.name,
        quantity: lineItem.quantity,
        price: lineItem.price,
        subtotal: lineItem.quantity * lineItem.price,
      }));

      // Calcular totales
      const totalItems = lineItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const subtotal = cart.calculateSubtotal();
      const discount = cart.calculateDiscount();
      const couponCode = cart.appliedCoupon?.code || null;
      const totalAmount = cart.calculateTotal();

      this.presenter.presentSuccess(
        input.customerId,
        items,
        totalItems,
        subtotal,
        discount,
        couponCode,
        totalAmount,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      this.presenter.presentError(errorMessage);
    }
  }
}
