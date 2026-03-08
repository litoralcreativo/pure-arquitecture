import {
  RouteConfig,
  RouteBuilder,
} from "@frameworks-and-drivers/web/route-config";
import { RouteControllers } from "@frameworks-and-drivers/web/route-helpers";

/**
 * Builds the complete route configuration for the application.
 * Maps all HTTP endpoints to their respective controllers and presenters.
 *
 * Routes:
 * - POST /cart - Create cart
 * - GET /cart/:customerId - Get cart
 * - POST /cart/add-product - Add product
 * - DELETE /cart/remove-product - Remove product
 * - PATCH /cart/increase-quantity - Increase quantity
 * - PATCH /cart/decrease-quantity - Decrease quantity
 * - POST /cart/apply-coupon - Apply coupon
 * - DELETE /cart/remove-coupon - Remove coupon
 * - POST /checkout - Checkout cart
 * - GET /purchases/history/:customerId - Purchase history
 * - GET /purchases/:purchaseId/customer/:customerId - Purchase details
 *
 * @param controllers - Map of controller/presenter pairs
 * @returns Array of route configurations
 */
export function buildRoutes(controllers: RouteControllers): RouteConfig[] {
  return [
    // POST /cart - Create a new cart
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

    // GET /cart/:customerId - Get customer's cart
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

    // POST /cart/add-product - Add product to cart
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

    // DELETE /cart/remove-product - Remove product from cart
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

    // PATCH /cart/increase-quantity - Increase product quantity
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

    // PATCH /cart/decrease-quantity - Decrease product quantity
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

    // POST /cart/apply-coupon - Apply discount coupon
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

    // DELETE /cart/remove-coupon - Remove discount coupon
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

    // POST /checkout - Perform checkout (complete purchase)
    RouteBuilder.post(
      "/checkout",
      controllers.checkoutCart.controller,
      controllers.checkoutCart.presenter,
      (req) => ({
        body: {
          customerId: req.body.customerId,
        },
      }),
    ),

    // GET /purchases/history/:customerId - Get purchase history
    RouteBuilder.get(
      "/purchases/history/:customerId",
      controllers.getPurchaseHistory.controller,
      controllers.getPurchaseHistory.presenter,
      (req) => ({
        body: {},
        params: {
          customerId: String(req.params.customerId),
        },
      }),
    ),

    // GET /purchases/:purchaseId/customer/:customerId - Get purchase details
    RouteBuilder.get(
      "/purchases/:purchaseId/customer/:customerId",
      controllers.getPurchaseById.controller,
      controllers.getPurchaseById.presenter,
      (req) => ({
        body: {},
        params: {
          purchaseId: String(req.params.purchaseId),
          customerId: String(req.params.customerId),
        },
      }),
    ),
  ];
}
