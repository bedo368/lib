import { Book } from "src/common/entities/book.entity";

export class BookModel {
  constructor(public book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.price = book.price;
    this.availableQuantity = book.availableQuantity;
    this.ISBN = book.ISBN;
    this.rentalPricePerDay = book.rentalPricePerDay;
  }
  id: string;
  title: string;
  price: number;
  availableQuantity: number;
  ISBN: string;
  rentalPricePerDay: number;


  tojson() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      availableQuantity: this.availableQuantity,
      ISBN: this.ISBN,
      rentalPricePerDay: this.rentalPricePerDay,
    };
  }
}