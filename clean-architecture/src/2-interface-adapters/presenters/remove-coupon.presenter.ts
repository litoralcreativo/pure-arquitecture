import {
  RemoveCouponOutputBoundary,
  RemoveCouponViewModel,
} from "@usecases/use-cases/remove-coupon/remove-coupon.output-boundary";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Presenter for remove coupon use case.
 * Transforms operation results into view-ready format.
 */
export class RemoveCouponPresenter
  implements RemoveCouponOutputBoundary, Presenter<RemoveCouponViewModel>
{
  private viewModel: RemoveCouponViewModel = { success: false };

  presentSuccess(): void {
    this.viewModel = { success: true };
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
