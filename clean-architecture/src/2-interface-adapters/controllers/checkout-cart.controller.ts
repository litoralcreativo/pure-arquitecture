import { CheckoutCartInputBoundary } from "@usecases/use-cases/checkout-cart/checkout-cart.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

interface CheckoutCartRequestBody {
  customerId: string;
}

export class CheckoutCartController implements Controller<CheckoutCartRequestBody> {
  constructor(private readonly useCase: CheckoutCartInputBoundary) {}

  async handle(req: HttpRequest<CheckoutCartRequestBody>): Promise<void> {
    const input = {
      customerId: req.body.customerId,
    };

    await this.useCase.execute(input);
  }
}
