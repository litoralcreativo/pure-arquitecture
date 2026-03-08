import { Customer } from "@entities/customer";

export interface CustomerRepository {
  getById(id: string): Promise<Customer | null>;

  save(customer: Customer): Promise<void>;
}
