import { GetCartInputBoundary } from "@usecases/use-cases/get-cart/get-cart.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

export class GetCartController implements Controller {
  constructor(private readonly useCase: GetCartInputBoundary) {}

  async handle(req: HttpRequest): Promise<void> {
    const input = {
      customerId: req.params?.customerId || "",
    };

    await this.useCase.execute(input);
  }
}
