/**
 * Input data for creating a cart.
 */
export interface CreateCartInput {
  customerId: string;
}

/**
 * Input boundary for creating a new cart.
 * Defines the contract for cart creation use case.
 */
export interface CreateCartInputBoundary {
  execute(input: CreateCartInput): Promise<void>;
}
