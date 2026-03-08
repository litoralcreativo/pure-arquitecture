/**
 * Input data for removing a product from cart.
 */
export interface RemoveProductFromCartInput {
  customerId: string;
  productId: string;
}

/**
 * Input boundary for removing products from cart.
 * Defines the contract for remove product use case.
 */
export interface RemoveProductFromCartInputBoundary {
  execute(input: RemoveProductFromCartInput): Promise<void>;
}
