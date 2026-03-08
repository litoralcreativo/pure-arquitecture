import { GetPurchaseByIdInput } from "./get-purchase-by-id.dto";

/**
 * GetPurchaseByIdInputBoundary - Contrato del caso de uso
 *
 * Define la operación para consultar el detalle completo de una compra específica.
 */
export interface GetPurchaseByIdInputBoundary {
  /**
   * Ejecuta la consulta del detalle de una compra
   * @param request - Datos necesarios (purchaseId, customerId)
   */
  execute(request: GetPurchaseByIdInput): Promise<void>;
}
