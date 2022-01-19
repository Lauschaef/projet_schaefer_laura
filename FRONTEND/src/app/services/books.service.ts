import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  booksSubject = new Subject<any[]>();
  bookSubject = new Subject<Book>();
  books: Book[] = [];
  book: Book = new Book;

  getBookByReference(ref: string) : Observable<Book> {
    let data : string = "ref=" + ref;
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<Book>("https://tp-bdd.herokuapp.com/api/getBookByRef", data, httpOption);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>("https://tp-bdd.herokuapp.com/api/getBooks");
  }

  constructor(private http:HttpClient) { }
}
