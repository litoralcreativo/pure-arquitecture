import {
  AddProductToCartOutputBoundary,
  AddProductToCartViewModel,
} from "@usecases/use-cases/add-product-to-cart/add-product-to-cart.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Presenter for add product to cart use case.
 * Transforms operation results into view-ready format.
 */
export class AddProductToCartPresenter
  implements
    AddProductToCartOutputBoundary,
    Presenter<AddProductToCartViewModel>
{
  private viewModel: AddProductToCartViewModel = { success: false };

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

  getViewModel(): AddProductToCartViewModel {
    return this.viewModel;
  }
}
