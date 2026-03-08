import {
  ApplyCouponOutputBoundary,
  ApplyCouponViewModel,
  ApplyCouponSuccessData,
} from "@usecases/use-cases/apply-coupon/apply-coupon.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Presenter for apply coupon use case.
 * Handles coupon application result presentation.
 */
export class ApplyCouponPresenter
  implements ApplyCouponOutputBoundary, Presenter<ApplyCouponViewModel>
{
  private viewModel: ApplyCouponViewModel = { success: false };

  presentSuccess(data: ApplyCouponSuccessData): void {
    this.viewModel = {
      success: true,
      message: `Coupon '${data.couponCode}' applied successfully`,
      subtotal: data.subtotal,
      discount: data.discount,
      total: data.total,
      couponCode: data.couponCode,
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
