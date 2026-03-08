import { Controller } from "../abstractions/controller";
import { HttpRequest } from "../abstractions/http-request";
import { DecreaseQuantityDTO } from "@usecases/use-cases/decrease-quantity/decrease-quantity.dto";
import { DecreaseQuantityInputBoundary } from "@usecases/use-cases/decrease-quantity/decrease-quantity.input-boundary";

export class DecreaseQuantityController implements Controller<DecreaseQuantityDTO> {
  constructor(private useCase: DecreaseQuantityInputBoundary) {}

  async handle(request: HttpRequest<DecreaseQuantityDTO>): Promise<void> {
    await this.useCase.execute(request.body);
  }
}
