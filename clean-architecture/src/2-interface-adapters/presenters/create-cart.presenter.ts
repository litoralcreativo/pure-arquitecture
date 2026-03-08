import {
  CreateCartOutputBoundary,
  CreateCartViewModel,
} from "@usecases/use-cases/create-cart/create-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class CreateCartPresenter
  implements CreateCartOutputBoundary, Presenter<CreateCartViewModel>
{
  private viewModel: CreateCartViewModel = { success: false };

  presentSuccess(cartId: string): void {
    this.viewModel = {
      success: true,
      cartId,
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): CreateCartViewModel {
    return this.viewModel;
  }
}
