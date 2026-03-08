import { Product } from "./product";

export class LineItem {
  constructor(
    public readonly product: Product,
    public quantity: number,
    public readonly price: number,
  ) {}

  calculateSubtotal(): number {
    return this.quantity * this.price;
  }
}
