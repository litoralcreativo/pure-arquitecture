export interface PurchaseSummary {
  purchaseId: string;
  customerId: string;
  totalItems: number;
  totalUnits: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  status: string;
  createdAt: string;
}

export interface GetPurchaseHistoryViewModel {
  success: boolean;
  data?: {
    purchases: PurchaseSummary[];
    count: number;
  };
  error?: string;
}

export interface GetPurchaseHistoryOutputBoundary {
  presentSuccess(purchases: PurchaseSummary[]): void;
  presentError(message: string): void;
  getViewModel(): GetPurchaseHistoryViewModel;
}
