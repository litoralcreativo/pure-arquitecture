/**
 * Input data for getting purchase history.
 */
export interface GetPurchaseHistoryInput {
  customerId: string;
}

/**
 * GetPurchaseHistoryInputBoundary - Contrato del caso de uso
 *
 * Define la operación para consultar el historial de compras de un cliente.
 */
export interface GetPurchaseHistoryInputBoundary {
  /**
   * Ejecuta la consulta del historial de compras
   * @param input - Datos necesarios (customerId)
   */
  execute(input: GetPurchaseHistoryInput): Promise<void>;
}
