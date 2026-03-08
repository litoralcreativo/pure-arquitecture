import { Product } from "@entities/product";
import { ProductRepository } from "@usecases/abstractions/product.repository";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    // Datos de prueba iniciales
    new Product("p1", "Laptop"),
    new Product("p2", "Mouse"),
    new Product("p3", "Keyboard"),
  ];

  async getById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);

    return product ?? null;
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }
}
