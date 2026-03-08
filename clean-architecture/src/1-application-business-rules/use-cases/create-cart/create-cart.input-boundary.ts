import { CreateCartInput } from "./create-cart.dto";

export interface CreateCartInputBoundary {
  execute(input: CreateCartInput): Promise<void>;
}
