import { Purchase } from "@entities/purchase";
import { PurchaseRepository } from "@usecases/abstractions/purchase.repository";

export class InMemoryPurchaseRepository implements PurchaseRepository {
  private purchases: Purchase[] = [];

  async save(purchase: Purchase): Promise<void> {
    this.purchases.push(purchase);
  }

  async findByCustomerId(customerId: string): Promise<Purchase[]> {
    const customerPurchases = this.purchases.filter(
      (p) => p.customerId === customerId,
    );

    // Ordenar por fecha descendente (más reciente primero)
    return customerPurchases.sort((a, b) => {
      return b.getCreatedAt().getTime() - a.getCreatedAt().getTime();
    });
  }

  async findById(purchaseId: string): Promise<Purchase | null> {
    const purchase = this.purchases.find((p) => p.id === purchaseId);
    return purchase ?? null;
  }
}
