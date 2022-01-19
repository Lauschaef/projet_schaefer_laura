import { Book } from '../../src/app/models/book.model';

export class RemoveBookOfShoppingCart {
  static readonly type = '[OrderContent] Remove';

  constructor(public book: Book) {}
}