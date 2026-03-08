import {
  GetPurchaseHistoryOutputBoundary,
  GetPurchaseHistoryViewModel,
  PurchaseSummary,
} from "@usecases/use-cases/get-purchase-history/get-purchase-history.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Presenter for get purchase history use case.
 * Transforms purchase history into view-ready format.
 */
export class GetPurchaseHistoryPresenter
  implements
    GetPurchaseHistoryOutputBoundary,
    Presenter<GetPurchaseHistoryViewModel>
{
  private viewModel: GetPurchaseHistoryViewModel = { success: false };

  presentSuccess(purchases: PurchaseSummary[]): void {
    this.viewModel = {
      success: true,
      data: {
        purchases,
        count: purchases.length,
      },
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): GetPurchaseHistoryViewModel {
    return this.viewModel;
  }
}
