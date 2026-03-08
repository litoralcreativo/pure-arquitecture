/**
 * Input data for retrieving cart information.
 */
export interface GetCartInput {
  customerId: string;
}

/**
 * Input boundary for retrieving cart information.
 * Defines the contract for get cart use case.
 */
export interface GetCartInputBoundary {
  execute(input: GetCartInput): Promise<void>;
}
