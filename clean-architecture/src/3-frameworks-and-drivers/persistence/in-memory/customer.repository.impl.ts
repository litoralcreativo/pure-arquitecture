import { Customer } from "@entities/customer";
import { CustomerRepository } from "@usecases/abstractions/customer.repository";

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [
    // Datos de prueba iniciales
    new Customer("c1", "John", "Doe"),
    new Customer("c2", "Jane", "Smith"),
    new Customer("c3", "Bob", "Johnson"),
  ];

  async getById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((c) => c.id === id);

    return customer ?? null;
  }

  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
}
