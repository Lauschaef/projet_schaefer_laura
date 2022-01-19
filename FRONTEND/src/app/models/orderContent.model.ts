import { Book } from "src/app/models/book.model";

export class OrderContent {

    book : Book;
    quantity : number;

    constructor (book : Book, quantity : number){
        this.book = book;
        this.quantity = quantity;
    }
}
