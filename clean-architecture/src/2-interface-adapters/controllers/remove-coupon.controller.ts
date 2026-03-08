import { RemoveCouponInputBoundary } from "@usecases/use-cases/remove-coupon/remove-coupon.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

interface RemoveCouponRequestBody {
  customerId: string;
}

export class RemoveCouponController implements Controller<RemoveCouponRequestBody> {
  constructor(private readonly useCase: RemoveCouponInputBoundary) {}

  async handle(req: HttpRequest<RemoveCouponRequestBody>): Promise<void> {
    const input = {
      customerId: req.body.customerId,
    };

    await this.useCase.execute(input);
  }
}
