import {
  CreateCartOutputBoundary,
  CreateCartViewModel,
  CreateCartSuccessData,
} from "@usecases/use-cases/create-cart/create-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Presenter for create cart use case.
 * Handles cart creation result presentation.
 */
export class CreateCartPresenter
  implements CreateCartOutputBoundary, Presenter<CreateCartViewModel>
{
  private viewModel: CreateCartViewModel = { success: false };

  presentSuccess(data: CreateCartSuccessData): void {
    this.viewModel = {
      success: true,
      cartId: data.cartId,
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
