import { CreateCartInputBoundary } from "@usecases/use-cases/create-cart/create-cart.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

interface CreateCartRequestBody {
  customerId: string;
}

export class CreateCartController implements Controller<CreateCartRequestBody> {
  constructor(private readonly useCase: CreateCartInputBoundary) {}

  async handle(req: HttpRequest<CreateCartRequestBody>): Promise<void> {
    const input = {
      customerId: req.body.customerId,
    };

    await this.useCase.execute(input);
  }
}
