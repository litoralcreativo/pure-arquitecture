/**
 * Product entity representing an item available for purchase.
 * Contains basic product identification information.
 */
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
