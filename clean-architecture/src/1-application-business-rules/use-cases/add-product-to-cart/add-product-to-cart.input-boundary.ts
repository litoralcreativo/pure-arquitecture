import { AddProductToCartInput } from "./add-product-to-cart.dto";

export interface AddProductToCartInputBoundary {
  execute(input: AddProductToCartInput): Promise<void>;
}
