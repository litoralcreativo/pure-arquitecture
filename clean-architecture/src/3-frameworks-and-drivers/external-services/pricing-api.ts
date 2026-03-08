export class PricingApi {
  private prices: Record<string, number> = {
    p1: 1000,
    p2: 25,
    p3: 75,
  };

  async getPrice(productId: string): Promise<number> {
    // simulamos latencia de red
    await new Promise((resolve) => setTimeout(resolve, 50));

    const price = this.prices[productId];

    if (!price) {
      throw new Error("Price not found");
    }

    return price;
  }
}
