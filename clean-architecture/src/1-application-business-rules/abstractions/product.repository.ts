import { Product } from "@entities/product";

/**
 * Repository abstraction for product persistence.
 * Defines operations for retrieving product information.
 * Implementations handle the actual data storage mechanism.
 */
export interface ProductRepository {
  /**
   * Retrieves a product by its ID.
   * @param id - The product's unique identifier
   * @returns The product if found, null otherwise
   */
  getById(id: string): Promise<Product | null>;
}
