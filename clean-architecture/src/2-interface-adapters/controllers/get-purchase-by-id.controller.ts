import { GetPurchaseByIdInputBoundary } from "@usecases/use-cases/get-purchase-by-id/get-purchase-by-id.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

export class GetPurchaseByIdController implements Controller {
  constructor(private readonly useCase: GetPurchaseByIdInputBoundary) {}

  async handle(req: HttpRequest): Promise<void> {
    const input = {
      purchaseId: req.params?.purchaseId || "",
      customerId: req.params?.customerId || "",
    };

    await this.useCase.execute(input);
  }
}
