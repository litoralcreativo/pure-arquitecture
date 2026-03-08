import {
  RemoveProductFromCartOutputBoundary,
  RemoveProductFromCartViewModel,
} from "@usecases/use-cases/remove-product-from-cart/remove-product-from-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class RemoveProductFromCartPresenter
  implements
    RemoveProductFromCartOutputBoundary,
    Presenter<RemoveProductFromCartViewModel>
{
  private viewModel: RemoveProductFromCartViewModel = { success: false };

  presentSuccess(): void {
    this.viewModel = {
      success: true,
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): RemoveProductFromCartViewModel {
    return this.viewModel;
  }
}
