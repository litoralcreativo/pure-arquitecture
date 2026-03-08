import { Purchase } from "../../0-enterprise-business-rules/purchase";

/**
 * PurchaseRepository - Contrato para la persistencia de compras
 *
 * Define las operaciones necesarias para almacenar y recuperar compras.
 * Esta es una abstracción (Dependency Inversion Principle) que será
 * implementada por la capa de infraestructura.
 *
 * Operaciones:
 * - save: Persiste una nueva compra
 * - findByCustomerId: Recupera todas las compras de un cliente
 * - findById: Recupera una compra específica por su ID
 */
export interface PurchaseRepository {
  /**
   * Persiste una compra en el sistema
   * @param purchase - La compra a guardar
   * @returns Promise que se resuelve cuando se complete la operación
   */
  save(purchase: Purchase): Promise<void>;

  /**
   * Recupera todas las compras de un cliente específico
   * @param customerId - ID del cliente
   * @returns Promise con array de compras (ordenadas por fecha descendente)
   */
  findByCustomerId(customerId: string): Promise<Purchase[]>;

  /**
   * Recupera una compra específica por su ID
   * @param purchaseId - ID de la compra a buscar
   * @returns Promise con la compra encontrada o null si no existe
   */
  findById(purchaseId: string): Promise<Purchase | null>;
}
