import { AddProductToCartInputBoundary } from "./add-product-to-cart.input-boundary";
import { AddProductToCartInput } from "./add-product-to-cart.dto";
import { CartRepository } from "@usecases/abstractions/cart.repository";
import { ProductRepository } from "@usecases/abstractions/product.repository";
import { AddProductToCartOutputBoundary } from "./add-product-to-cart.output-boundary";
import { PriceGateway } from "@usecases/abstractions/price.gateway";

export class AddProductToCartUseCase implements AddProductToCartInputBoundary {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
    private priceGateway: PriceGateway,
    private presenter: AddProductToCartOutputBoundary,
  ) {}

  async execute(input: AddProductToCartInput): Promise<void> {
    try {
      const cart = await this.cartRepository.getByCustomerId(input.customerId);

      if (!cart) {
        this.presenter.presentError(
          "Cart not found. Please create a cart first",
        );
        return;
      }

      const product = await this.productRepository.getById(input.productId);

      if (!product) {
        this.presenter.presentError("Product not found");
        return;
      }

      const price = await this.priceGateway.getPrice(product.id);
      cart.addProduct(product, price);

      await this.cartRepository.save(cart);

      this.presenter.presentSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      this.presenter.presentError(errorMessage);
    }
  }
}
