import { RemoveProductFromCartInput } from "./remove-product-from-cart.dto";

export interface RemoveProductFromCartInputBoundary {
  execute(input: RemoveProductFromCartInput): Promise<void>;
}
