import { Book } from '../../src/app/models/book.model';

export class DeleteBookOfShoppingCart {
  static readonly type = '[OrderContent] Delete';

  constructor(public book: Book) {}
}