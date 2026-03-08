import { Presenter } from "../abstractions/presenter";
import {
  DecreaseQuantityOutputBoundary,
  DecreaseQuantityViewModel,
} from "@usecases/use-cases/decrease-quantity/decrease-quantity.output-boundary";

export class DecreaseQuantityPresenter
  implements
    DecreaseQuantityOutputBoundary,
    Presenter<DecreaseQuantityViewModel>
{
  private viewModel: DecreaseQuantityViewModel = { success: false };

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

  getViewModel(): DecreaseQuantityViewModel {
    return this.viewModel;
  }
}
