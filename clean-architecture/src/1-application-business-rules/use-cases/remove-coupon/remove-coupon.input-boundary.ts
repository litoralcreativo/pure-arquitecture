import { RemoveCouponInput } from "./remove-coupon.dto";

export interface RemoveCouponInputBoundary {
  execute(request: RemoveCouponInput): Promise<void>;
}
