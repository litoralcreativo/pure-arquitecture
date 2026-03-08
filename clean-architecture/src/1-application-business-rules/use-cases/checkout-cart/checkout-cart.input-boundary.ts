import { CheckoutCartInput } from "./checkout-cart.dto";

/**
 * CheckoutCartInputBoundary - Contrato del caso de uso Checkout
 *
 * Define la operación de entrada para realizar el checkout de un carrito.
 * El controlador llamará a este método para ejecutar el caso de uso.
 */
export interface CheckoutCartInputBoundary {
  /**
   * Ejecuta el proceso de checkout
   * @param request - Datos necesarios para el checkout (customerId)
   */
  execute(request: CheckoutCartInput): Promise<void>;
}
