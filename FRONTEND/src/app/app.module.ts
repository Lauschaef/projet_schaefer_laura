import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormService } from './services/form.service';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './bookList/bookList.component';
import { VariablesGlobales } from './variablesGlobales';
import { BookFilterPipe } from './pipes/gender-filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PaymentComponent } from './payment/payment.component';
import { HistoryComponent } from './history/history.component';
import { OrderContentState } from 'shared/states/order_content-state';

const appRoutes: Routes = [
  { path: 'catalogue',
    loadChildren: () => import('./page/page.module'). then(m => m.PageModule)},
  { path: '', component: BookListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    FooterComponent,
    BookFilterPipe,
    SearchPipe,
    OrderByPipe,
    PaymentComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([OrderContentState]),
  ],
  providers: [
    FormService,
    VariablesGlobales
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
