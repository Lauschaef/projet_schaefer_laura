import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddBookOnShoppingCart } from "shared/actions/bookAdd.action";
import { DeleteBookOfShoppingCart } from 'shared/actions/bookDelete.action';
import { RemoveBookOfShoppingCart } from 'shared/actions/bookRemove.action';
import { EmptyShoppingCart } from 'shared/actions/emptyCart.action';
import { OrderContent } from 'src/app/models/orderContent.model';
import { OrderContentStateModel } from './order_content-state-model';

@State<OrderContentStateModel>({
    name: 'books',
    defaults: {
      booksOnShoppingCart: [],
    },
  })

@Injectable()
export class OrderContentState {
  
  @Selector()
  static getListeBooksOnShoppingCart(state: OrderContentStateModel): OrderContent[] {
    return state.booksOnShoppingCart;
  }

  @Selector()
  static getTotalPrice(state: OrderContentStateModel): number {
      return state.booksOnShoppingCart.reduce(
          function(prev, data) {
              return prev + (data.quantity * data.book.price);
          }, 0
      );
  }

  @Selector()
  static getNbBooksOnShoppingCart(state: OrderContentStateModel) {
      return state.booksOnShoppingCart.reduce(
          function(prev, data) {
              return prev + data.quantity;
          }, 0
      );
  }

  @Action(AddBookOnShoppingCart)
  add({ getState, patchState }: StateContext<OrderContentStateModel>,{ book }: AddBookOnShoppingCart) {
    const state = getState();
    const indexItem = state.booksOnShoppingCart.findIndex((item: OrderContent) => item.book.reference === book.reference);

    if(indexItem === -1) {
      var orderContent = new OrderContent(book, 1);

      patchState({
        booksOnShoppingCart: [...state.booksOnShoppingCart, orderContent],
      });

    } else {
      var orderContentNewQte = state.booksOnShoppingCart;
      orderContentNewQte[indexItem].quantity++;

      patchState({
          booksOnShoppingCart: orderContentNewQte,
      });
    }
  }

  @Action(DeleteBookOfShoppingCart)
  delete({ getState, patchState }: StateContext<OrderContentStateModel>,{ book }: DeleteBookOfShoppingCart) {
    const state = getState();
    patchState({
        booksOnShoppingCart: state.booksOnShoppingCart.filter(item => item.book.reference !== book.reference)
    });
  }

  @Action(RemoveBookOfShoppingCart)
    removeOne({ getState, patchState }: StateContext<OrderContentStateModel>, { book }: RemoveBookOfShoppingCart) {
        const state = getState();

        let newOrderContent: OrderContent[] = [];
        var booksOnShoppingCart = state.booksOnShoppingCart;

        booksOnShoppingCart.forEach(
            element => {
                if(element.book.reference == book.reference) {
                    if(element.quantity > 1) {
                        newOrderContent.push(new OrderContent(element.book, element.quantity -1));
                    }
                } else {
                    newOrderContent.push(new OrderContent(element.book, element.quantity));
                }   
            }
        )
        patchState({
            booksOnShoppingCart: newOrderContent,
        });
    }

  @Action(EmptyShoppingCart)
    empty({ getState, patchState }: StateContext<OrderContentStateModel>): void {
        const state = getState();

        patchState({ 
            booksOnShoppingCart: []
        });
    }
}