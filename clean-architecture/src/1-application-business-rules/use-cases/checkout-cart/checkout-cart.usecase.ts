import { CartRepository } from "../../abstractions/cart.repository";
import { PurchaseRepository } from "../../abstractions/purchase.repository";
import { Purchase } from "../../../0-enterprise-business-rules/purchase";
import { PurchaseItem } from "../../../0-enterprise-business-rules/purchase-item";
import { PurchaseStatus } from "../../../0-enterprise-business-rules/purchase-status";
import { CheckoutCartInputBoundary } from "./checkout-cart.input-boundary";
import { CheckoutCartOutputBoundary } from "./checkout-cart.output-boundary";
import { CheckoutCartInput } from "./checkout-cart.dto";

/**
 * CheckoutCartUseCase - Caso de uso para realizar el checkout
 *
 * Implementa la lógica de negocio para convertir un carrito en una compra:
 * 1. Valida que el carrito no esté vacío (RN-11)
 * 2. Crea un snapshot del carrito como Purchase (RN-12, RN-13)
 * 3. Persiste la Purchase
 * 4. Vacía el carrito (RN-14)
 * 5. Retorna confirmación
 *
 * Reglas de negocio aplicadas:
 * - RN-11: Checkout requiere carrito no vacío
 * - RN-12: Purchase es inmutable
 * - RN-13: Snapshot de precios en Purchase
 * - RN-14: Carrito se vacía después del checkout
 */
export class CheckoutCartUseCase implements CheckoutCartInputBoundary {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly purchaseRepository: PurchaseRepository,
    private readonly presenter: CheckoutCartOutputBoundary,
  ) {}

  public async execute(request: CheckoutCartInput): Promise<void> {
    try {
      // 1. Obtener el carrito del cliente
      const cart = await this.cartRepository.getByCustomerId(
        request.customerId,
      );

      if (!cart) {
        this.presenter.presentError("Cart not found for this customer");
        return;
      }

      // 2. Validar que el carrito no esté vacío (RN-11)
      if (cart.isEmpty) {
        this.presenter.presentError("Cannot checkout an empty cart");
        return;
      }

      // 3. Crear PurchaseItems desde los LineItems del carrito (snapshot)
      const cartItems = cart.getProducts();
      const purchaseItems = cartItems.map((lineItem) => {
        return new PurchaseItem(
          lineItem.product.id,
          lineItem.product.name,
          lineItem.quantity,
          lineItem.price,
        );
      });

      // 4. Crear la Purchase (snapshot inmutable del carrito)
      const purchaseId = this.generatePurchaseId();
      const subtotal = cart.calculateSubtotal();
      const discount = cart.calculateDiscount();
      const total = cart.calculateTotal();
      const couponCode = cart.appliedCoupon?.code || null;

      const purchase = new Purchase(
        purchaseId,
        cart.customerId,
        purchaseItems,
        subtotal,
        discount,
        total,
        couponCode,
        PurchaseStatus.COMPLETED,
      );

      // 5. Persistir la Purchase
      await this.purchaseRepository.save(purchase);

      // 6. Vaciar el carrito (RN-14)
      // Eliminamos todos los productos del carrito
      const productsToRemove = cart.getProducts();
      for (const lineItem of productsToRemove) {
        cart.removeProduct(lineItem.product.id);
      }
      // Removemos el cupón si existe
      if (cart.appliedCoupon) {
        cart.removeCoupon();
      }
      await this.cartRepository.save(cart);

      // 7. Preparar y presentar respuesta
      const responseData = {
        purchaseId: purchase.id,
        customerId: purchase.customerId,
        items: purchase.getItems().map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.getSubtotal(),
        })),
        subtotal: purchase.subtotal,
        discount: purchase.discount,
        total: purchase.total,
        couponCode: purchase.couponCode,
        totalUnits: purchase.getTotalUnits(),
        createdAt: purchase.getCreatedAt().toISOString(),
        status: purchase.status,
      };

      // 8. Presentar éxito
      this.presenter.presentSuccess(responseData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      this.presenter.presentError(errorMessage);
    }
  }

  /**
   * Genera un ID único para la compra
   * En producción, esto podría usar UUID o un generador más robusto
   */
  private generatePurchaseId(): string {
    return `pur-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
