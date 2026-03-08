/**
 * Input data for increasing product quantity.
 */
export interface IncreaseQuantityInput {
  customerId: string;
  productId: string;
}

/**
 * Input boundary for increasing product quantity in cart.
 * Defines the contract for increase quantity use case.
 */
export interface IncreaseQuantityInputBoundary {
  execute(input: IncreaseQuantityInput): Promise<void>;
}
