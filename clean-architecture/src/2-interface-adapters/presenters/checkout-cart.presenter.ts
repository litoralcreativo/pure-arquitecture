import {
  CheckoutCartOutputBoundary,
  CheckoutCartViewModel,
} from "@usecases/use-cases/checkout-cart/checkout-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class CheckoutCartPresenter
  implements CheckoutCartOutputBoundary, Presenter<CheckoutCartViewModel>
{
  private viewModel: CheckoutCartViewModel = { success: false };

  presentSuccess(data: CheckoutCartViewModel["data"]): void {
    this.viewModel = {
      success: true,
      data,
      message: "Purchase completed successfully",
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): CheckoutCartViewModel {
    return this.viewModel;
  }
}
