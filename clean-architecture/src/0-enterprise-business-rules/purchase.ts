import { PurchaseItem } from "./purchase-item";
import { PurchaseStatus } from "./purchase-status";

/**
 * Purchase - Entidad que representa una compra completada
 *
 * Es un snapshot inmutable del carrito en el momento del checkout.
 * Captura el estado exacto de la compra: productos, precios, descuentos y total pagado.
 *
 * Reglas de negocio (RN):
 * - RN-12: Purchase es inmutable (no se puede modificar después de crear)
 * - RN-13: Captura snapshot de precios en el momento del checkout
 * - RN-16: Cada purchase tiene un ID único
 *
 * Esta entidad representa el registro histórico permanente de una transacción.
 */
export class Purchase {
  private readonly createdAt: Date;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    private readonly items: PurchaseItem[],
    public readonly subtotal: number,
    public readonly discount: number,
    public readonly total: number,
    public readonly couponCode: string | null,
    public readonly status: PurchaseStatus,
  ) {
    if (items.length === 0) {
      throw new Error("Purchase must have at least one item");
    }
    if (subtotal < 0) {
      throw new Error("Purchase subtotal cannot be negative");
    }
    if (discount < 0) {
      throw new Error("Purchase discount cannot be negative");
    }
    if (total < 0) {
      throw new Error("Purchase total cannot be negative");
    }

    this.createdAt = new Date();
  }

  /**
   * Obtiene la lista de items de la compra (inmutable)
   */
  public getItems(): readonly PurchaseItem[] {
    return [...this.items];
  }

  /**
   * Obtiene la fecha de creación de la compra
   */
  public getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  /**
   * Obtiene el número total de unidades compradas
   */
  public getTotalUnits(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Verifica si la compra está completada
   */
  public isCompleted(): boolean {
    return this.status === PurchaseStatus.COMPLETED;
  }

  /**
   * Obtiene una representación plana de la compra para serialización
   */
  public toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      items: this.items.map((item) => item.toJSON()),
      subtotal: this.subtotal,
      discount: this.discount,
      total: this.total,
      couponCode: this.couponCode,
      status: this.status,
      totalUnits: this.getTotalUnits(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
