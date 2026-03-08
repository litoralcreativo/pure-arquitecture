import { Presenter } from "../abstractions/presenter";
import {
  IncreaseQuantityOutputBoundary,
  IncreaseQuantityViewModel,
} from "@usecases/use-cases/increase-quantity/increase-quantity.output-boundary";

export class IncreaseQuantityPresenter
  implements
    IncreaseQuantityOutputBoundary,
    Presenter<IncreaseQuantityViewModel>
{
  private viewModel: IncreaseQuantityViewModel = { success: false };

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

  getViewModel(): IncreaseQuantityViewModel {
    return this.viewModel;
  }
}
