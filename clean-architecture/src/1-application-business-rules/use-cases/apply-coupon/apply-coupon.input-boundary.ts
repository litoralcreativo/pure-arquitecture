import { ApplyCouponInput } from "./apply-coupon.dto";

export interface ApplyCouponInputBoundary {
  execute(request: ApplyCouponInput): Promise<void>;
}
