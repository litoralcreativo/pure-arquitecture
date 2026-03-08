import {
  RemoveCouponOutputBoundary,
  RemoveCouponViewModel,
} from "@usecases/use-cases/remove-coupon/remove-coupon.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export class RemoveCouponPresenter
  implements RemoveCouponOutputBoundary, Presenter<RemoveCouponViewModel>
{
  private viewModel: RemoveCouponViewModel = { success: false };

  presentSuccess(subtotal: number, total: number): void {
    this.viewModel = {
      success: true,
      message: "Coupon removed successfully",
      subtotal,
      total,
    };
  }

  presentError(message: string): void {
    this.viewModel = {
      success: false,
      error: message,
    };
  }

  getViewModel(): RemoveCouponViewModel {
    return this.viewModel;
  }
}
