/**
 * Input data for decreasing product quantity.
 */
export interface DecreaseQuantityInput {
  customerId: string;
  productId: string;
}

/**
 * Input boundary for decreasing product quantity in cart.
 * Defines the contract for decrease quantity use case.
 */
export interface DecreaseQuantityInputBoundary {
  execute(input: DecreaseQuantityInput): Promise<void>;
}
