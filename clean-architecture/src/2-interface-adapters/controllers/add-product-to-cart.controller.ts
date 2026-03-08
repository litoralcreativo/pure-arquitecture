import { AddProductToCartInputBoundary } from "@usecases/use-cases/add-product-to-cart/add-product-to-cart.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

interface AddProductToCartRequestBody {
  customerId: string;
  productId: string;
}

export class AddProductToCartController implements Controller<AddProductToCartRequestBody> {
  constructor(private readonly useCase: AddProductToCartInputBoundary) {}

  async handle(req: HttpRequest<AddProductToCartRequestBody>): Promise<void> {
    const input = {
      customerId: req.body.customerId,
      productId: req.body.productId,
    };

    await this.useCase.execute(input);
  }
}
