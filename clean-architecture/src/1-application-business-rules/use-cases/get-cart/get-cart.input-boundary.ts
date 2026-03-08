import { GetCartInput } from "./get-cart.dto";

export interface GetCartInputBoundary {
  execute(input: GetCartInput): Promise<void>;
}
