/**
 * PurchaseItem - Línea individual de una compra
 *
 * Representa un producto específico dentro de una compra completada.
 * Es un snapshot inmutable de lo que el cliente compró.
 *
 * Reglas de negocio:
 * - La cantidad debe ser mayor a 0
 * - El precio debe ser mayor a 0
 * - El subtotal se calcula como cantidad × precio
 */
export class PurchaseItem {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {
    if (quantity <= 0) {
      throw new Error("Purchase item quantity must be greater than 0");
    }
    if (unitPrice < 0) {
      throw new Error("Purchase item price cannot be negative");
    }
  }

  /**
   * Calcula el subtotal de este item (cantidad × precio unitario)
   */
  public getSubtotal(): number {
    return this.quantity * this.unitPrice;
  }

  /**
   * Obtiene una representación plana del item para serialización
   */
  public toJSON() {
    return {
      productId: this.productId,
      productName: this.productName,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      subtotal: this.getSubtotal(),
    };
  }
}
