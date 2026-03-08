import { Product } from "@entities/product";

export interface ProductRepository {
  getById(id: string): Promise<Product | null>;
}
