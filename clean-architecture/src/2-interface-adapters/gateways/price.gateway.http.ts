import { PricingApi } from "@frameworks-and-drivers/external-services/pricing-api";
import { PriceGateway } from "@usecases/abstractions/price.gateway";

/**
 * HTTP implementation of the price gateway.
 * Retrieves product prices from external pricing API service.
 */
export class PriceGatewayHttp implements PriceGateway {
  constructor(private pricingApi: PricingApi) {}

  /**
   * Retrieves the current price for a product from the pricing API.
   * @param productId - The product identifier
   * @returns The current price of the product
   */
  async getPrice(productId: string): Promise<number> {
    return this.pricingApi.getPrice(productId);
  }
}
