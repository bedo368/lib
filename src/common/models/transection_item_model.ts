import { Transaction } from 'src/common/entities/transaction.entity';
import { TransactionItem } from 'src/common/entities/transection_item.entity';
import { BookModel } from './book_model';

export class TransactionItemModel {
  constructor(public transactionItem: TransactionItem) {
    this.id = transactionItem.id;
    this.quantity = transactionItem.quantity;
    this.book = new BookModel(transactionItem.book);
    this.price = transactionItem.price;
    this.itemTotal = transactionItem.itemTotal;
    this.type = transactionItem.type;
  }

  id: string;
  quantity: number;
  book: BookModel;
  price: number;
  itemTotal: number;
  type: string;

  tojson() {
    return {
      id: this.id,
      quantity: this.quantity,
      book: this.book.tojson(),
      price: this.price,
      itemTotal: this.itemTotal,
      type: this.type,
    };
  }
}
