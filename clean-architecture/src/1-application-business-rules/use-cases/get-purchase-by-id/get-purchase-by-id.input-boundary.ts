/**
 * Input data for getting purchase by ID.
 */
export interface GetPurchaseByIdInput {
  purchaseId: string;
  customerId: string;
}

/**
 * GetPurchaseByIdInputBoundary - Contrato del caso de uso
 *
 * Define la operación para consultar el detalle completo de una compra específica.
 */
export interface GetPurchaseByIdInputBoundary {
  /**
   * Ejecuta la consulta del detalle de una compra
   * @param input - Datos necesarios (purchaseId, customerId)
   */
  execute(input: GetPurchaseByIdInput): Promise<void>;
}
