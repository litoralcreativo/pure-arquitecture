/**
 * Gateway abstraction for external pricing service.
 * Defines operations for retrieving product prices from external systems.
 * Implementations handle communication with pricing APIs or services.
 */
export interface PriceGateway {
  /**
   * Retrieves the current price for a product.
   * @param productId - The product's unique identifier
   * @returns The product's current price
   */
  getPrice(productId: string): Promise<number>;
}
