import {
  RouteConfig,
  RouteBuilder,
} from "@frameworks-and-drivers/web/route-config";
import { RouteControllers } from "@frameworks-and-drivers/web/route-helpers";

export function buildRoutes(controllers: RouteControllers): RouteConfig[] {
  return [
    // POST /cart - Crear un nuevo cart
    RouteBuilder.post(
      "/cart",
      controllers.createCart.controller,
      controllers.createCart.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
        },
      }),
    ),

    // GET /cart/:customerId - Obtener el cart de un cliente
    RouteBuilder.get(
      "/cart/:customerId",
      controllers.getCart.controller,
      controllers.getCart.presenter,
      (req) => ({
        body: {},
        params: {
          customerId: String(req.params.customerId),
        },
      }),
    ),

    // POST /cart/add-product - Agregar producto al cart
    RouteBuilder.post(
      "/cart/add-product",
      controllers.addProductToCart.controller,
      controllers.addProductToCart.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
          productId: req.body.productId,
        },
      }),
    ),

    // DELETE /cart/remove-product - Remover producto del cart
    RouteBuilder.delete(
      "/cart/remove-product",
      controllers.removeProductFromCart.controller,
      controllers.removeProductFromCart.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
          productId: req.body.productId,
        },
      }),
    ),

    // PATCH /cart/increase-quantity - Incrementar cantidad de un producto
    RouteBuilder.patch(
      "/cart/increase-quantity",
      controllers.increaseQuantity.controller,
      controllers.increaseQuantity.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
          productId: req.body.productId,
        },
      }),
    ),

    // PATCH /cart/decrease-quantity - Decrementar cantidad de un producto
    RouteBuilder.patch(
      "/cart/decrease-quantity",
      controllers.decreaseQuantity.controller,
      controllers.decreaseQuantity.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
          productId: req.body.productId,
        },
      }),
    ),

    // POST /cart/apply-coupon - Aplicar cupón de descuento
    RouteBuilder.post(
      "/cart/apply-coupon",
      controllers.applyCoupon.controller,
      controllers.applyCoupon.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
          couponCode: req.body.couponCode,
        },
      }),
    ),

    // DELETE /cart/remove-coupon - Remover cupón de descuento
    RouteBuilder.delete(
      "/cart/remove-coupon",
      controllers.removeCoupon.controller,
      controllers.removeCoupon.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
        },
      }),
    ),
  ];
}
