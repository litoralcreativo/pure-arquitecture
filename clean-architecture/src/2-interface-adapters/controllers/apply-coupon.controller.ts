import { ApplyCouponInputBoundary } from "@usecases/use-cases/apply-coupon/apply-coupon.input-boundary";
import { HttpRequest } from "@interface-adapters/abstractions/http-request";
import { Controller } from "@interface-adapters/abstractions/controller";

interface ApplyCouponRequestBody {
  customerId: string;
  couponCode: string;
}

export class ApplyCouponController implements Controller<ApplyCouponRequestBody> {
  constructor(private readonly useCase: ApplyCouponInputBoundary) {}

  async handle(req: HttpRequest<ApplyCouponRequestBody>): Promise<void> {
    const input = {
      customerId: req.body.customerId,
      couponCode: req.body.couponCode,
    };

    await this.useCase.execute(input);
  }
}
