export interface PurchaseItemViewModel {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PurchaseDetailViewModel {
  purchaseId: string;
  customerId: string;
  items: PurchaseItemViewModel[];
  totalItems: number;
  totalUnits: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  status: string;
  createdAt: string;
}

export interface GetPurchaseByIdViewModel {
  success: boolean;
  data?: PurchaseDetailViewModel;
  error?: string;
}

export interface GetPurchaseByIdOutputBoundary {
  presentSuccess(
    purchaseId: string,
    customerId: string,
    items: PurchaseItemViewModel[],
    totalItems: number,
    totalUnits: number,
    subtotal: number,
    discount: number,
    total: number,
    couponCode: string | null,
    status: string,
    createdAt: string,
  ): void;
  presentError(message: string): void;
  getViewModel(): GetPurchaseByIdViewModel;
}
