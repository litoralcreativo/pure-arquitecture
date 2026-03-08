import { Customer } from "@entities/customer";
import { CustomerRepository } from "@usecases/abstractions/customer.repository";

/**
 * In-memory implementation of customer repository.
 * Pre-loads sample customers for development and testing purposes.
 */
export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [
    // Sample test data
    new Customer("c1", "John", "Doe"),
    new Customer("c2", "Jane", "Smith"),
    new Customer("c3", "Bob", "Johnson"),
  ];

  /**
   * Retrieves a customer by ID.
   * @param id - The customer identifier
   * @returns The customer if found, null otherwise
   */
  async getById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((c) => c.id === id);

    return customer ?? null;
  }

  /**
   * Saves a new customer to the repository.
   * @param customer - The customer to save
   */
  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
}
