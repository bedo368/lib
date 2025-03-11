import { Transaction } from '../entities/transaction.entity';
import { TransactionItemModel } from './transection_item_model';

export class TransactionModel {
  constructor(public transaction: Transaction) {
    this.id = transaction.id;
    this.total = transaction.total;
    this.transactionDate = transaction.transactionDate;
    this.items = transaction.items.map(
      (item) => new TransactionItemModel(item),
    );
    this.transactionId = transaction.transactionId;
    this.user = transaction.user.id;
  }

  id: string;
  total: number;
  transactionDate: Date;
  items: TransactionItemModel[];
  transactionId: string;
  user: string;
  tojson() {
    return {
      id: this.id,
      total: this.total,
      transactionDate: this.transactionDate,
      items: this.items.map((item) => item.tojson()),
      transactionId: this.transactionId,
      creator: this.user
    };
  }
  toString() {
    return JSON.stringify(this);
  }
}
