import { GetPurchaseHistoryInput } from "./get-purchase-history.dto";

/**
 * GetPurchaseHistoryInputBoundary - Contrato del caso de uso
 *
 * Define la operación para consultar el historial de compras de un cliente.
 */
export interface GetPurchaseHistoryInputBoundary {
  /**
   * Ejecuta la consulta del historial de compras
   * @param request - Datos necesarios (customerId)
   */
  execute(request: GetPurchaseHistoryInput): Promise<void>;
}
