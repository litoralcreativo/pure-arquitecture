import { RemoveProductFromCartInputBoundary } from "@usecases/use-cases/remove-product-from-cart/remove-product-from-cart.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

interface RemoveProductFromCartRequestBody {
  customerId: string;
  productId: string;
}

export class RemoveProductFromCartController implements Controller<RemoveProductFromCartRequestBody> {
  constructor(private readonly useCase: RemoveProductFromCartInputBoundary) {}

  async handle(
    req: HttpRequest<RemoveProductFromCartRequestBody>,
  ): Promise<void> {
    const input = {
      customerId: req.body.customerId,
      productId: req.body.productId,
    };

    await this.useCase.execute(input);
  }
}
