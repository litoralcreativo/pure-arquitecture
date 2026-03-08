import { IncreaseQuantityDTO } from "./increase-quantity.dto";

export interface IncreaseQuantityInputBoundary {
  execute(dto: IncreaseQuantityDTO): Promise<void>;
}
