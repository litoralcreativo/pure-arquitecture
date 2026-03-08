import {
  GetCartOutputBoundary,
  GetCartViewModel,
  GetCartSuccessData,
} from "@usecases/use-cases/get-cart/get-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Presenter for get cart use case.
 * Transforms cart data into view-ready format.
 */
export class GetCartPresenter
  implements GetCartOutputBoundary, Presenter<GetCartViewModel>
{
  private viewModel: GetCartViewModel = { success: false };

  presentSuccess(data: GetCartSuccessData): void {
    this.viewModel = {
      success: true,
      customerId: data.customerId,
      items: data.items,
      totalItems: data.totalItems,
      subtotal: data.subtotal,
      discount: data.discount,
      couponCode: data.couponCode || undefined,
      totalAmount: data.totalAmount,
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): GetCartViewModel {
    return this.viewModel;
  }
}
