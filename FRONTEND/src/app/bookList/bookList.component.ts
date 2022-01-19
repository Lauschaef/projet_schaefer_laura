import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AddBookOnShoppingCart } from 'shared/actions/bookAdd.action';
import { DeleteBookOfShoppingCart } from 'shared/actions/bookDelete.action';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-product',
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.css']
})
export class BookListComponent implements OnInit {

  books : Book[] = [];
  bookSubscription: Subscription | undefined;
  genderFilter : string = "";
  searchFilter : string = "";
  sortMode : string = "reference";

  constructor(private booksService : BooksService, private router : Router, private store : Store) {}

  addBookOnShoppingCart(book: Book){
    this.store.dispatch(new AddBookOnShoppingCart(book));
  }

  ngOnInit(): void {
    // this.bookSubscription = this.booksService.booksSubject.subscribe(
    //   (books: Book[]) => {
    //     this.books = books;
    //   }
    // );

    this.booksService.getBooks().subscribe(
      (data) => this.books = data
    );
  }

}
