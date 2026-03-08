export interface CartItemViewModel {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

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

export interface GetCartOutputBoundary {
  presentSuccess(
    customerId: string,
    items: CartItemViewModel[],
    totalItems: number,
    subtotal: number,
    discount: number,
    couponCode: string | null,
    totalAmount: number,
  ): void;
  presentError(message: string): void;
  getViewModel(): GetCartViewModel;
}
