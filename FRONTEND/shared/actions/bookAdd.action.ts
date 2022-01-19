import { Book } from '../../src/app/models/book.model';

export class AddBookOnShoppingCart {
  static readonly type = '[OrderContent] Add';

  constructor(public book: Book) {}
}