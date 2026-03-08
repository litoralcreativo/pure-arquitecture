/**
 * Input data for adding a product to cart.
 */
export interface AddProductToCartInput {
  customerId: string;
  productId: string;
}

/**
 * Input boundary for adding products to cart.
 * Defines the contract for add product use case.
 */
export interface AddProductToCartInputBoundary {
  execute(input: AddProductToCartInput): Promise<void>;
}
