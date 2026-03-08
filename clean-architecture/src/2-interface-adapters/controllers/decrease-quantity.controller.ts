import { Controller } from "../abstractions/controller";
import { HttpRequest } from "../abstractions/http-request";
import { DecreaseQuantityInput } from "@usecases/use-cases/decrease-quantity/decrease-quantity.input-boundary";
import { DecreaseQuantityInputBoundary } from "@usecases/use-cases/decrease-quantity/decrease-quantity.input-boundary";

export class DecreaseQuantityController implements Controller<DecreaseQuantityInput> {
  constructor(private useCase: DecreaseQuantityInputBoundary) {}

  async handle(request: HttpRequest<DecreaseQuantityInput>): Promise<void> {
    await this.useCase.execute(request.body);
  }
}
