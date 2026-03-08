import { GetPurchaseHistoryInputBoundary } from "@usecases/use-cases/get-purchase-history/get-purchase-history.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

export class GetPurchaseHistoryController implements Controller {
  constructor(private readonly useCase: GetPurchaseHistoryInputBoundary) {}

  async handle(req: HttpRequest): Promise<void> {
    const input = {
      customerId: req.params?.customerId || "",
    };

    await this.useCase.execute(input);
  }
}
