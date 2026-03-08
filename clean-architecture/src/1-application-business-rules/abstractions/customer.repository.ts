import { Customer } from "@entities/customer";

/**
 * Repository abstraction for customer persistence.
 * Defines operations for storing and retrieving customer information.
 * Implementations handle the actual data storage mechanism.
 */
export interface CustomerRepository {
  /**
   * Retrieves a customer by their ID.
   * @param id - The customer's unique identifier
   * @returns The customer if found, null otherwise
   */
  getById(id: string): Promise<Customer | null>;

  /**
   * Persists a customer to storage.
   * @param customer - The customer entity to save
   */
  save(customer: Customer): Promise<void>;
}
