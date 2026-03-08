import { Presenter } from "../abstractions/presenter";
import { DecreaseQuantityOutputBoundary } from "@usecases/use-cases/decrease-quantity/decrease-quantity.output-boundary";

interface DecreaseQuantityViewModel {
  success: boolean;
  message: string;
  statusCode: number;
}

export class DecreaseQuantityPresenter
  implements
    DecreaseQuantityOutputBoundary,
    Presenter<DecreaseQuantityViewModel>
{
  private viewModel: DecreaseQuantityViewModel = {
    success: false,
    message: "",
    statusCode: 500,
  };

  success(): void {
    this.viewModel = {
      success: true,
      message: "Quantity decreased successfully",
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

  getViewModel(): DecreaseQuantityViewModel {
    return this.viewModel;
  }
}
