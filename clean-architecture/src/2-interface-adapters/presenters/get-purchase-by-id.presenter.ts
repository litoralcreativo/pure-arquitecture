import {
  GetPurchaseByIdOutputBoundary,
  GetPurchaseByIdViewModel,
  PurchaseItemViewModel,
} from "@usecases/use-cases/get-purchase-by-id/get-purchase-by-id.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class GetPurchaseByIdPresenter
  implements GetPurchaseByIdOutputBoundary, Presenter<GetPurchaseByIdViewModel>
{
  private viewModel: GetPurchaseByIdViewModel = { success: false };

  presentSuccess(
    purchaseId: string,
    customerId: string,
    items: PurchaseItemViewModel[],
    totalItems: number,
    totalUnits: number,
    subtotal: number,
    discount: number,
    total: number,
    couponCode: string | null,
    status: string,
    createdAt: string,
  ): void {
    this.viewModel = {
      success: true,
      data: {
        purchaseId,
        customerId,
        items,
        totalItems,
        totalUnits,
        subtotal,
        discount,
        total,
        couponCode,
        status,
        createdAt,
      },
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): GetPurchaseByIdViewModel {
    return this.viewModel;
  }
}
