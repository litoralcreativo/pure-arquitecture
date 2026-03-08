/**
 * Cart item representation for presentation layer.
 */
export interface CartItemViewModel {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

/**
 * Data structure for successful get-cart operation.
 */
export interface GetCartSuccessData {
  customerId: string;
  items: CartItemViewModel[];
  totalItems: number;
  subtotal: number;
  discount: number;
  couponCode: string | null;
  totalAmount: number;
}

/**
 * View model for get cart operation.
 */
export interface GetCartViewModel {
  success: boolean;
  customerId?: string;
  items?: CartItemViewModel[];
  totalItems?: number;
  subtotal?: number;
  discount?: number;
  couponCode?: string;
  totalAmount?: number;
  error?: string;
}

/**
 * Output boundary for retrieving cart information.
 * Defines how cart data is presented to the user.
 */
export interface GetCartOutputBoundary {
  presentSuccess(data: GetCartSuccessData): void;
  presentError(message: string): void;
  getViewModel(): GetCartViewModel;
}
