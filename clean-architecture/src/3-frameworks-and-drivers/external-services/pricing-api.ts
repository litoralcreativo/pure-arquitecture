/**
 * External pricing API service (mock implementation).
 * Simulates a third-party service that provides product pricing information.
 * In production, this would make real HTTP calls to an external pricing service.
 */
export class PricingApi {
  private prices: Record<string, number> = {
    p1: 1000,
    p2: 25,
    p3: 75,
  };

  /**
   * Retrieves the price for a given product.
   * Simulates network latency for realistic testing.
   * @param productId - The product identifier
   * @returns The product price
   * @throws Error if price is not found for the product
   */
  async getPrice(productId: string): Promise<number> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 50));

    const price = this.prices[productId];

    if (!price) {
      throw new Error("Price not found");
    }

    return price;
  }
}
