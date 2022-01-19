import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { DeleteBookOfShoppingCart } from 'shared/actions/bookDelete.action';
import { VariablesGlobales } from '../variablesGlobales';
import { Book } from 'src/app/models/book.model';
import { OrderContent } from '../models/orderContent.model';
import { AddBookOnShoppingCart } from 'shared/actions/bookAdd.action';
import { RemoveBookOfShoppingCart } from 'shared/actions/bookRemove.action';
import { OrderContentState } from 'shared/states/order_content-state';
import { HistoryService } from '../services/history.service';
import { Order } from '../models/order.model';
import { EmptyShoppingCart } from 'shared/actions/emptyCart.action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

booksOnShoppingCart : Observable<OrderContent[]>;

  constructor(private store : Store, public param: VariablesGlobales, private historyService : HistoryService, private router: Router) {
    this.booksOnShoppingCart = this.store.select(state => state.booksOnShoppingCart.booksOnShoppingCart);
  }

  ngOnInit(): void {
  }

  @Select(OrderContentState.getListeBooksOnShoppingCart) liste$: Observable<OrderContent[]> | undefined;
  @Select(OrderContentState.getTotalPrice) total$: Observable<number> | undefined;
  @Select(OrderContentState.getNbBooksOnShoppingCart) nb$: Observable<number> | undefined;

  addBookOnShoppingCart(book: Book){
    this.store.dispatch(new AddBookOnShoppingCart(book));
    this.update();
  }

  removeBookOfShoppingCart(book: Book){
    this.store.dispatch(new RemoveBookOfShoppingCart(book));
    this.update();
  }

  deleteBookOfShoppingCart(book: Book){
    this.store.dispatch(new DeleteBookOfShoppingCart(book));
  }

  getTotalProductPrice(price : number, quantity : number) : number {
    return price * quantity;
  }

  update(): void {
    this.ngOnInit();
  }

  onSubmit(){
      if(!this.param.userIsConnected)
      {
        this.router.navigate(["/catalogue/connexion"]);
      } 
      else if(this.store.dispatch.length > 0)
      {
          let list: OrderContent[] = [];
          this.liste$?.subscribe(
            (item) => {
                list = item;
            }
          );

          let dateTime = new Date();

          this.historyService.saveOrder(new Order(0, dateTime,list)).subscribe(
            (data) => {
                this.store.dispatch(new EmptyShoppingCart)
                this.router.navigate(["/catalogue/payment"]);
            }
          )
        }
    }

}
