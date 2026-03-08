import { Product } from "@entities/product";
import { ProductRepository } from "@usecases/abstractions/product.repository";

/**
 * In-memory implementation of product repository.
 * Pre-loads sample products for development and testing purposes.
 */
export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    // Sample test data
    new Product("p1", "Laptop"),
    new Product("p2", "Mouse"),
    new Product("p3", "Keyboard"),
  ];

  /**
   * Retrieves a product by ID.
   * @param id - The product identifier
   * @returns The product if found, null otherwise
   */
  async getById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);

    return product ?? null;
  }

  /**
   * Saves a new product to the repository.
   * @param product - The product to save
   */
  async save(product: Product): Promise<void> {
    this.products.push(product);
  }
}
