import {
  GetCartOutputBoundary,
  GetCartViewModel,
  CartItemViewModel,
} from "@usecases/use-cases/get-cart/get-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class GetCartPresenter
  implements GetCartOutputBoundary, Presenter<GetCartViewModel>
{
  private viewModel: GetCartViewModel = { success: false };

  presentSuccess(
    customerId: string,
    items: CartItemViewModel[],
    totalItems: number,
    subtotal: number,
    discount: number,
    couponCode: string | null,
    totalAmount: number,
  ): void {
    this.viewModel = {
      success: true,
      customerId,
      items,
      totalItems,
      subtotal,
      discount,
      couponCode: couponCode || undefined,
      totalAmount,
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
