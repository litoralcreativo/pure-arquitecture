import { Controller } from "../abstractions/controller";
import { HttpRequest } from "../abstractions/http-request";
import { IncreaseQuantityInput } from "@usecases/use-cases/increase-quantity/increase-quantity.input-boundary";
import { IncreaseQuantityInputBoundary } from "@usecases/use-cases/increase-quantity/increase-quantity.input-boundary";

export class IncreaseQuantityController implements Controller<IncreaseQuantityInput> {
  constructor(private useCase: IncreaseQuantityInputBoundary) {}

  async handle(request: HttpRequest<IncreaseQuantityInput>): Promise<void> {
    await this.useCase.execute(request.body);
  }
}
