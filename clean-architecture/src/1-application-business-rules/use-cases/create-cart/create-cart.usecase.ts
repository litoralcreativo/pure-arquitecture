import { CreateCartInputBoundary } from "./create-cart.input-boundary";
import { CreateCartInput } from "./create-cart.dto";
import { CartRepository } from "@usecases/abstractions/cart.repository";
import { CustomerRepository } from "@usecases/abstractions/customer.repository";
import { CreateCartOutputBoundary } from "./create-cart.output-boundary";
import { Cart } from "@entities/cart";

export class CreateCartUseCase implements CreateCartInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private customerRepository: CustomerRepository,
    private presenter: CreateCartOutputBoundary,
  ) {}

  async execute(input: CreateCartInput): Promise<void> {
    try {
      // Validar que el customer existe
      const customer = await this.customerRepository.getById(input.customerId);

      if (!customer) {
        this.presenter.presentError("Customer not found");
        return;
      }

      // Verificar si ya existe un cart para este customer
      const existingCart = await this.cartRepository.getByCustomerId(
        input.customerId,
      );

      if (existingCart) {
        this.presenter.presentError("Cart already exists for this customer");
        return;
      }

      // Crear nuevo cart
      const cart = new Cart(input.customerId);

      // Guardar cart
      await this.cartRepository.save(cart);

      this.presenter.presentSuccess(input.customerId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      this.presenter.presentError(errorMessage);
    }
  }
}
