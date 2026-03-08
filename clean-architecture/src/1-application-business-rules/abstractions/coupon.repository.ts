import { Coupon } from "@entities/coupon";

export interface CouponRepository {
  /**
   * Busca un cupón por su código
   * @param code - Código del cupón a buscar
   * @returns El cupón si existe, null si no se encuentra
   */
  findByCode(code: string): Promise<Coupon | null>;
}
