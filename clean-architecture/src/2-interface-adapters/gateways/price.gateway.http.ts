import { PricingApi } from "@frameworks-and-drivers/external-services/pricing-api";
import { PriceGateway } from "@usecases/abstractions/price.gateway";

export class PriceGatewayHttp implements PriceGateway {
  constructor(private pricingApi: PricingApi) {}

  async getPrice(productId: string): Promise<number> {
    return this.pricingApi.getPrice(productId);
  }
}
