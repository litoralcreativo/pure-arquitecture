/**
 * Purchase status enumeration.
 * Represents possible states of a purchase transaction.
 */
export enum PurchaseStatus {
  /** Purchase is completed and confirmed */
  COMPLETED = "completed",
  /** Purchase is awaiting confirmation or payment */
  PENDING = "pending",
}
