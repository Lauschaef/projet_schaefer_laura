import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecapComponent } from '../recap/recap.component';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { BookComponent } from '../book/book.component';
import { BookListComponent } from '../bookList/bookList.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { RouterModule, Routes } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from '../pipes/phone.pipe';
import { ConnectFormComponent } from '../connect-form/connect-form.component';
import { UserConnectedComponent } from '../user-connected/user-connected.component';
import { PaymentComponent } from '../payment/payment.component';
import { HistoryComponent } from '../history/history.component';

const appChild: Routes = [
  { path: 'recap', component: RecapComponent },
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'products', component: BookListComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'book/:ref', component: BookComponent},
  { path: 'connexion', component: ConnectFormComponent},
  { path: 'connecte', component: UserConnectedComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'history', component: HistoryComponent}
];

@NgModule({
  declarations: [
    RecapComponent,
    FormulaireComponent,
    ShoppingCartComponent,
    BookComponent,
    ConnectFormComponent,
    UserConnectedComponent,
    PhonePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
    
  ]
})
export class PageModule { }
