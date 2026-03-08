export interface PriceGateway {
  getPrice(productId: string): Promise<number>;
}
