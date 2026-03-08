import { DecreaseQuantityDTO } from "./decrease-quantity.dto";

export interface DecreaseQuantityInputBoundary {
  execute(dto: DecreaseQuantityDTO): Promise<void>;
}
