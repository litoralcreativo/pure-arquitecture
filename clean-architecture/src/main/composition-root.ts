import { AddProductToCartUseCase } from "@usecases/use-cases/add-product-to-cart/add-product-to-cart.usecase";
import { AddProductToCartController } from "@interface-adapters/controllers/add-product-to-cart.controller";
import { AddProductToCartPresenter } from "@interface-adapters/presenters/add-product-to-cart.presenter";
import { CreateCartUseCase } from "@usecases/use-cases/create-cart/create-cart.usecase";
import { CreateCartController } from "@interface-adapters/controllers/create-cart.controller";
import { CreateCartPresenter } from "@interface-adapters/presenters/create-cart.presenter";
import { GetCartUseCase } from "@usecases/use-cases/get-cart/get-cart.usecase";
import { GetCartController } from "@interface-adapters/controllers/get-cart.controller";
import { GetCartPresenter } from "@interface-adapters/presenters/get-cart.presenter";
import { RemoveProductFromCartUseCase } from "@usecases/use-cases/remove-product-from-cart/remove-product-from-cart.usecase";
import { RemoveProductFromCartController } from "@interface-adapters/controllers/remove-product-from-cart.controller";
import { RemoveProductFromCartPresenter } from "@interface-adapters/presenters/remove-product-from-cart.presenter";
import { IncreaseQuantityUseCase } from "@usecases/use-cases/increase-quantity/increase-quantity.usecase";
import { IncreaseQuantityController } from "@interface-adapters/controllers/increase-quantity.controller";
import { IncreaseQuantityPresenter } from "@interface-adapters/presenters/increase-quantity.presenter";
import { DecreaseQuantityUseCase } from "@usecases/use-cases/decrease-quantity/decrease-quantity.usecase";
import { DecreaseQuantityController } from "@interface-adapters/controllers/decrease-quantity.controller";
import { DecreaseQuantityPresenter } from "@interface-adapters/presenters/decrease-quantity.presenter";
import { ApplyCouponUseCase } from "@usecases/use-cases/apply-coupon/apply-coupon.usecase";
import { ApplyCouponController } from "@interface-adapters/controllers/apply-coupon.controller";
import { ApplyCouponPresenter } from "@interface-adapters/presenters/apply-coupon.presenter";
import { RemoveCouponUseCase } from "@usecases/use-cases/remove-coupon/remove-coupon.usecase";
import { RemoveCouponController } from "@interface-adapters/controllers/remove-coupon.controller";
import { RemoveCouponPresenter } from "@interface-adapters/presenters/remove-coupon.presenter";
import { CheckoutCartUseCase } from "@usecases/use-cases/checkout-cart/checkout-cart.usecase";
import { CheckoutCartController } from "@interface-adapters/controllers/checkout-cart.controller";
import { CheckoutCartPresenter } from "@interface-adapters/presenters/checkout-cart.presenter";
import { GetPurchaseHistoryUseCase } from "@usecases/use-cases/get-purchase-history/get-purchase-history.usecase";
import { GetPurchaseHistoryController } from "@interface-adapters/controllers/get-purchase-history.controller";
import { GetPurchaseHistoryPresenter } from "@interface-adapters/presenters/get-purchase-history.presenter";
import { GetPurchaseByIdUseCase } from "@usecases/use-cases/get-purchase-by-id/get-purchase-by-id.usecase";
import { GetPurchaseByIdController } from "@interface-adapters/controllers/get-purchase-by-id.controller";
import { GetPurchaseByIdPresenter } from "@interface-adapters/presenters/get-purchase-by-id.presenter";
import { InMemoryCartRepository } from "@frameworks-and-drivers/persistence/in-memory/cart.repository.impl";
import { InMemoryCustomerRepository } from "@frameworks-and-drivers/persistence/in-memory/customer.repository.impl";
import { InMemoryCouponRepository } from "@frameworks-and-drivers/persistence/in-memory/coupon.repository.impl";
import { InMemoryPurchaseRepository } from "@frameworks-and-drivers/persistence/in-memory/purchase.repository.impl";
import { createRouter } from "@frameworks-and-drivers/web/express-router";
import { buildRoutes } from "@frameworks-and-drivers/web/routes";
import { createServer } from "@frameworks-and-drivers/web/express-server";
import { PricingApi } from "@frameworks-and-drivers/external-services/pricing-api";
import { PriceGatewayHttp } from "@interface-adapters/gateways/price.gateway.http";
import { InMemoryProductRepository } from "@frameworks-and-drivers/persistence/in-memory/product.repository.impl";

// Repositorios compartidos
const cartRepository = new InMemoryCartRepository();
const productRepository = new InMemoryProductRepository();
const customerRepository = new InMemoryCustomerRepository();
const couponRepository = new InMemoryCouponRepository();
const purchaseRepository = new InMemoryPurchaseRepository();

// Gateway compartido
const pricingApi = new PricingApi();
const priceGateway = new PriceGatewayHttp(pricingApi);

// Create Cart Use Case
const createCartPresenter = new CreateCartPresenter();
const createCartUseCase = new CreateCartUseCase(
  cartRepository,
  customerRepository,
  createCartPresenter,
);
const createCartController = new CreateCartController(createCartUseCase);

// Get Cart Use Case
const getCartPresenter = new GetCartPresenter();
const getCartUseCase = new GetCartUseCase(cartRepository, getCartPresenter);
const getCartController = new GetCartController(getCartUseCase);

// Add Product To Cart Use Case
const addProductToCartPresenter = new AddProductToCartPresenter();
const addProductToCartUseCase = new AddProductToCartUseCase(
  cartRepository,
  productRepository,
  priceGateway,
  addProductToCartPresenter,
);
const addProductToCartController = new AddProductToCartController(
  addProductToCartUseCase,
);

// Remove Product From Cart Use Case
const removeProductFromCartPresenter = new RemoveProductFromCartPresenter();
const removeProductFromCartUseCase = new RemoveProductFromCartUseCase(
  cartRepository,
  removeProductFromCartPresenter,
);
const removeProductFromCartController = new RemoveProductFromCartController(
  removeProductFromCartUseCase,
);

// Increase Quantity Use Case
const increaseQuantityPresenter = new IncreaseQuantityPresenter();
const increaseQuantityUseCase = new IncreaseQuantityUseCase(
  cartRepository,
  increaseQuantityPresenter,
);
const increaseQuantityController = new IncreaseQuantityController(
  increaseQuantityUseCase,
);

// Decrease Quantity Use Case
const decreaseQuantityPresenter = new DecreaseQuantityPresenter();
const decreaseQuantityUseCase = new DecreaseQuantityUseCase(
  cartRepository,
  decreaseQuantityPresenter,
);
const decreaseQuantityController = new DecreaseQuantityController(
  decreaseQuantityUseCase,
);

// Apply Coupon Use Case
const applyCouponPresenter = new ApplyCouponPresenter();
const applyCouponUseCase = new ApplyCouponUseCase(
  cartRepository,
  couponRepository,
  applyCouponPresenter,
);
const applyCouponController = new ApplyCouponController(applyCouponUseCase);

// Remove Coupon Use Case
const removeCouponPresenter = new RemoveCouponPresenter();
const removeCouponUseCase = new RemoveCouponUseCase(
  cartRepository,
  removeCouponPresenter,
);
const removeCouponController = new RemoveCouponController(removeCouponUseCase);

// Checkout Cart Use Case
const checkoutCartPresenter = new CheckoutCartPresenter();
const checkoutCartUseCase = new CheckoutCartUseCase(
  cartRepository,
  purchaseRepository,
  checkoutCartPresenter,
);
const checkoutCartController = new CheckoutCartController(checkoutCartUseCase);

// Get Purchase History Use Case
const getPurchaseHistoryPresenter = new GetPurchaseHistoryPresenter();
const getPurchaseHistoryUseCase = new GetPurchaseHistoryUseCase(
  purchaseRepository,
  getPurchaseHistoryPresenter,
);
const getPurchaseHistoryController = new GetPurchaseHistoryController(
  getPurchaseHistoryUseCase,
);

// Get Purchase By Id Use Case
const getPurchaseByIdPresenter = new GetPurchaseByIdPresenter();
const getPurchaseByIdUseCase = new GetPurchaseByIdUseCase(
  purchaseRepository,
  getPurchaseByIdPresenter,
);
const getPurchaseByIdController = new GetPurchaseByIdController(
  getPurchaseByIdUseCase,
);

// Configurar rutas
const routes = buildRoutes({
  createCart: {
    controller: createCartController,
    presenter: createCartPresenter,
  },
  getCart: {
    controller: getCartController,
    presenter: getCartPresenter,
  },
  addProductToCart: {
    controller: addProductToCartController,
    presenter: addProductToCartPresenter,
  },
  removeProductFromCart: {
    controller: removeProductFromCartController,
    presenter: removeProductFromCartPresenter,
  },
  increaseQuantity: {
    controller: increaseQuantityController,
    presenter: increaseQuantityPresenter,
  },
  decreaseQuantity: {
    controller: decreaseQuantityController,
    presenter: decreaseQuantityPresenter,
  },
  applyCoupon: {
    controller: applyCouponController,
    presenter: applyCouponPresenter,
  },
  removeCoupon: {
    controller: removeCouponController,
    presenter: removeCouponPresenter,
  },
  checkoutCart: {
    controller: checkoutCartController,
    presenter: checkoutCartPresenter,
  },
  getPurchaseHistory: {
    controller: getPurchaseHistoryController,
    presenter: getPurchaseHistoryPresenter,
  },
  getPurchaseById: {
    controller: getPurchaseByIdController,
    presenter: getPurchaseByIdPresenter,
  },
});

// Crear router y servidor
const router = createRouter(routes);
const server = createServer(router);

server.listen(3000, () => {
  console.log("Server running on port 3000", "http://localhost:3000");
});
