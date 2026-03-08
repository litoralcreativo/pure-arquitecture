export interface CheckoutCartViewModel {
  success: boolean;
  data?: {
    purchaseId: string;
    customerId: string;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }>;
    subtotal: number;
    discount: number;
    total: number;
    couponCode: string | null;
    totalUnits: number;
    createdAt: string;
    status: string;
  };
  message?: string;
  error?: string;
}

export interface CheckoutCartOutputBoundary {
  presentSuccess(data: CheckoutCartViewModel["data"]): void;
  presentError(message: string): void;
  getViewModel(): CheckoutCartViewModel;
}
