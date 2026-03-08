import { Presenter } from "../abstractions/presenter";
import { IncreaseQuantityOutputBoundary } from "@usecases/use-cases/increase-quantity/increase-quantity.output-boundary";

interface IncreaseQuantityViewModel {
  success: boolean;
  message: string;
  statusCode: number;
}

export class IncreaseQuantityPresenter
  implements
    IncreaseQuantityOutputBoundary,
    Presenter<IncreaseQuantityViewModel>
{
  private viewModel: IncreaseQuantityViewModel = {
    success: false,
    message: "",
    statusCode: 500,
  };

  success(): void {
    this.viewModel = {
      success: true,
      message: "Quantity increased successfully",
      statusCode: 200,
    };
  }

  cartNotFound(): void {
    this.viewModel = {
      success: false,
      message: "Cart not found",
      statusCode: 404,
    };
  }

  productNotFoundInCart(): void {
    this.viewModel = {
      success: false,
      message: "Product not found in cart",
      statusCode: 404,
    };
  }

  error(message: string): void {
    this.viewModel = {
      success: false,
      message: `Error: ${message}`,
      statusCode: 500,
    };
  }

  getViewModel(): IncreaseQuantityViewModel {
    return this.viewModel;
  }
}
