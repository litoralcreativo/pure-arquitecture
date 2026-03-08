import { Controller } from "../abstractions/controller";
import { HttpRequest } from "../abstractions/http-request";
import { IncreaseQuantityDTO } from "@usecases/use-cases/increase-quantity/increase-quantity.dto";
import { IncreaseQuantityInputBoundary } from "@usecases/use-cases/increase-quantity/increase-quantity.input-boundary";

export class IncreaseQuantityController implements Controller<IncreaseQuantityDTO> {
  constructor(private useCase: IncreaseQuantityInputBoundary) {}

  async handle(request: HttpRequest<IncreaseQuantityDTO>): Promise<void> {
    await this.useCase.execute(request.body);
  }
}
