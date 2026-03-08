import { PurchaseRepository } from "../../abstractions/purchase.repository";
import { GetPurchaseByIdInputBoundary } from "./get-purchase-by-id.input-boundary";
import {
  GetPurchaseByIdOutputBoundary,
  PurchaseItemViewModel,
} from "./get-purchase-by-id.output-boundary";
import { GetPurchaseByIdInput } from "./get-purchase-by-id.dto";

/**
 * GetPurchaseByIdUseCase - Caso de uso para consultar detalle de una compra
 *
 * Implementa la lógica para recuperar el detalle completo de una compra específica:
 * 1. Busca la compra por su ID
 * 2. Valida que la compra existe
 * 3. Valida que la compra pertenece al cliente solicitante (RN-15)
 * 4. Presenta el detalle completo con todos los items
 *
 * Reglas de negocio aplicadas:
 * - RN-15: Aislamiento de compras (validación de propiedad)
 * - RN-12: Purchase es inmutable (solo lectura)
 */
export class GetPurchaseByIdUseCase implements GetPurchaseByIdInputBoundary {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly presenter: GetPurchaseByIdOutputBoundary,
  ) {}

  public async execute(request: GetPurchaseByIdInput): Promise<void> {
    try {
      // 1. Buscar la compra por ID
      const purchase = await this.purchaseRepository.findById(
        request.purchaseId,
      );

      // 2. Validar que existe
      if (!purchase) {
        this.presenter.presentError("Purchase not found");
        return;
      }

      // 3. Validar que pertenece al cliente (RN-15)
      if (purchase.customerId !== request.customerId) {
        this.presenter.presentError(
          "Purchase does not belong to this customer",
        );
        return;
      }

      // 4. Convertir items a ViewModel
      const items: PurchaseItemViewModel[] = purchase
        .getItems()
        .map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.getSubtotal(),
        }));

      // 5. Presentar éxito con todos los detalles
      this.presenter.presentSuccess(
        purchase.id,
        purchase.customerId,
        items,
        items.length,
        purchase.getTotalUnits(),
        purchase.subtotal,
        purchase.discount,
        purchase.total,
        purchase.couponCode,
        purchase.status,
        purchase.getCreatedAt().toISOString(),
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      this.presenter.presentError(errorMessage);
    }
  }
}
