import {
  ApplyCouponOutputBoundary,
  ApplyCouponViewModel,
} from "@usecases/use-cases/apply-coupon/apply-coupon.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class ApplyCouponPresenter
  implements ApplyCouponOutputBoundary, Presenter<ApplyCouponViewModel>
{
  private viewModel: ApplyCouponViewModel = { success: false };

  presentSuccess(
    subtotal: number,
    discount: number,
    total: number,
    couponCode: string,
  ): void {
    this.viewModel = {
      success: true,
      message: `Coupon '${couponCode}' applied successfully`,
      subtotal,
      discount,
      total,
      couponCode,
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): ApplyCouponViewModel {
    return this.viewModel;
  }
}
