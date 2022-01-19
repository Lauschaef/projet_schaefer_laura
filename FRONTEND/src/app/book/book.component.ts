import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AddBookOnShoppingCart } from 'shared/actions/bookAdd.action';
import { Book } from 'src/app/models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book : Book = new Book;
  bookSubscription: Subscription | undefined;
  
  constructor(private booksService: BooksService, private route: ActivatedRoute,  private store : Store) { 
  }

  addBookOnShoppingCart(book: Book){
    this.store.dispatch(new AddBookOnShoppingCart(book));
  }

  ngOnInit(): void {
    const ref = this.route.snapshot.params['ref'];

    this.booksService.getBookByReference(ref).subscribe(
      (data) => this.book = data
    );
  }
}
