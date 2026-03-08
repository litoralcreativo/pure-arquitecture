import { PurchaseRepository } from "../../abstractions/purchase.repository";
import {
  GetPurchaseHistoryInputBoundary,
  GetPurchaseHistoryInput,
} from "./get-purchase-history.input-boundary";
import {
  GetPurchaseHistoryOutputBoundary,
  PurchaseSummary,
} from "./get-purchase-history.output-boundary";

/**
 * GetPurchaseHistoryUseCase - Caso de uso para consultar historial de compras
 *
 * Implementa la lógica para recuperar todas las compras de un cliente:
 * 1. Obtiene todas las compras del cliente desde el repositorio
 * 2. Las ordena por fecha descendente (más reciente primero)
 * 3. Presenta un resumen de cada compra
 *
 * Reglas de negocio aplicadas:
 * - RN-15: Aislamiento de compras (solo compras del cliente solicitante)
 * - Las compras se ordenan por fecha descendente
 */
export class GetPurchaseHistoryUseCase implements GetPurchaseHistoryInputBoundary {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly presenter: GetPurchaseHistoryOutputBoundary,
  ) {}

  public async execute(input: GetPurchaseHistoryInput): Promise<void> {
    try {
      // 1. Obtener todas las compras del cliente
      const purchases = await this.purchaseRepository.findByCustomerId(
        input.customerId,
      );

      // 2. Convertir a resumen (ya vienen ordenadas por fecha desc desde el repo)
      const purchaseSummaries: PurchaseSummary[] = purchases.map(
        (purchase) => ({
          purchaseId: purchase.id,
          customerId: purchase.customerId,
          totalItems: purchase.getItems().length,
          totalUnits: purchase.getTotalUnits(),
          subtotal: purchase.subtotal,
          discount: purchase.discount,
          total: purchase.total,
          couponCode: purchase.couponCode,
          status: purchase.status,
          createdAt: purchase.getCreatedAt().toISOString(),
        }),
      );

      // 3. Presentar éxito
      this.presenter.presentSuccess(purchaseSummaries);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      this.presenter.presentError(errorMessage);
    }
  }
}
